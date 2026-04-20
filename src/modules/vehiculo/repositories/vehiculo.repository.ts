import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { vehiculo } from '@prisma/client';

@Injectable()
export class VehiculoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByDominio(dominio: string): Promise<vehiculo[]> {
    return await this.prisma.vehiculo.findMany({
      take: 1,
      where: {
        dominio,
        activo: true,
      },
      orderBy: {
        version: 'desc',
      },
      include: {
        tipo_vehiculo: true,
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
        configuracion_ejes: true,
        tipo_carroceria: true,
      },
    });
  }
}
