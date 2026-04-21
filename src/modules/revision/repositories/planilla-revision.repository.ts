// repositories/planilla-revision.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PlanillaRevisionFilterDto } from '../dtos/planilla-revision-filter.dto';
import { planilla_revision } from '@prisma/client';

@Injectable()
export class PlanillaRevisionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findBy(filters: PlanillaRevisionFilterDto) {
    const { 
      page = 1, 
      limit = 5, 
      dominio, 
      fechaDesde, 
      fechaHasta 
    } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (dominio) {
      where.dominio = dominio.toUpperCase().trim();
    }

    if (fechaDesde || fechaHasta) {
      where.fecha = {};
      if (fechaDesde) where.fecha.gte = new Date(fechaDesde);
      if (fechaHasta) where.fecha.lte = new Date(fechaHasta);
    }

    // Ejecutamos la consulta. Para histórico de dominios, limitamos siempre.
    const records = await this.prisma.planilla_revision.findMany({
      where,
      skip,
      take: limit,
      orderBy: { id: 'desc' },
      select: {
          id: true,
          dominio: true,
          fecha: true,
          vehiculo_validado: true,
          cod_taller: true,
          resultado_id: true,
          vencimiento: true,
          nro_planilla: true,
          resultado: {
            select: {
              // id: true, //no traigo id porque lo uso plano..
              texto: true
            }
          },
          tipo_uso: {
            select: {
              id: true,
              codigo: true,
              abreviatura: true
            }
          },
          // Nota: Si el nombre de la relación es largo (como el de certificado),
          // úsalo tal cual aparece en tu schema.prisma
         certificado_planilla_revision_certificado_idTocertificado: {
            select: {
              id: true,
              serie:true,
              numero: true
            }
          }
        }
    });


    // Nota de Arquitectura: Evitar usar count() en producción si no hay filtros aplicados
    // ya que hará un Seq Scan de los 25M de registros.
    const total = await this.prisma.planilla_revision.count({ where });

    return {
      records,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      }
    };
  }

  async findDetalleById(id: bigint): Promise<planilla_revision | null> {
    return await this.prisma.planilla_revision.findUnique({
      where: { id },
      include: {
        vehiculo: {
          include: {
            tipo_vehiculo: true,
            categoria_vehiculo: true,
            localidad: {
              include: {
                provincia: {
                  include: {
                    pais: true,
                  },
                },
              },
            },
            modelo_motor: {
              include: {
                tipo_combustible: true,
                marca_motor: true,
              },
            },
            modelo_chasis: {
              include: {
                tipo_vehiculo: true,
                marca_chasis: true,
              },
            },
            tipo_caja_velocidad: true,
            tipo_carroceria: true,
            // tipo_de_tren: true,
          },
        },
        pais: true,
        localidad: {
          include: {
            provincia: {
              include: {
                pais: true,
              },
            },
          },
        },
        resultado: true,
        taller: true,
        tipo_uso: true,
        linea_inspeccion: true,
        convenio: true,
      },
    });
  }
}