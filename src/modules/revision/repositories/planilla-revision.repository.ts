// repositories/planilla-revision.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PlanillaRevisionFilterDto } from '../dtos/planilla-revision-filter.dto';

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

  async findDetalleById(id: bigint){
    return await this.prisma.planilla_revision.findUnique({
      where: { id },
      select: {
        id: true,
        version: true,
        nro_planilla: true,
        dominio: true,
        fecha: true,
        vencimiento: true,
        
        // Relación Vehículo -> Año, Tipo y Categoría
        vehiculo: {
          select: {
            anio: true,
            tipo_vehiculo: {
              select: { tipo: true } // De rto_tipo_vehiculo
            },
            categoria_vehiculo: {
              select: { categoria: true } // De categoria_vehiculo
            }
          }
        },

        // Relaciones Directas
        //Relacion convenio
        convenio: {
          select: { denominacion: true,
             alcance_convenio: {
              select: { alcance: true }
             },
             tipo_certificado: {
              select: { descripcion: true }
             }
           }
        },
        resultado: {
          select: { texto: true }
        },
        tipo_uso: {
          select: { abreviatura: true }
        },
        
        // Taller
        taller: {
          select: { 
            cod_taller: true, 
            razon_social: true // Usamos razon_social ya que nombre_taller no está en el schema
          }
        },

        // Certificado
        certificado_planilla_revision_certificado_idTocertificado: {
          select: {
            serie: true,
            numero: true
          }
        }
      }
    });
  }
}