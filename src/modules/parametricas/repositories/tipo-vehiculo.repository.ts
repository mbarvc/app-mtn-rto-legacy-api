import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { CreateTipoVehiculoDto, TipoVehiculoDto, UpdateTipoVehiculoDto } from '../dtos/tipo-vehiculo.dto';
import { handlePrismaError } from '@/src/common/helpers/prisma-error.helper';

@Injectable()
export class TiposVehiculoRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDto(raw: any): TipoVehiculoDto {
    return {
      id: raw.id.toString(),
      abreviatura: raw.abreviatura,
      codigo: raw.codigo,
      tipo: raw.tipo,
      motorizado: raw.motorizado ?? null,
      codigoVehTpo: raw.codigovehtpo ?? null,
      codigoVehTpoOtr: raw.codigovehtpootr ?? null,
      activo: raw.activo ?? false,
    };
  }

  async findAll(): Promise<TipoVehiculoDto[]> {
    const records = await this.prisma.rto_tipo_vehiculo.findMany({
      where: { activo: true },
      orderBy: { tipo: 'asc' },
    });
    return records.map((record) => this.mapToDto(record));
  }

  async findById(id: bigint): Promise<TipoVehiculoDto | null> {
    const record = await this.prisma.rto_tipo_vehiculo.findUnique({
      where: { id },
    });
    return record ? this.mapToDto(record) : null;
  }

  async update(id: bigint, data: UpdateTipoVehiculoDto): Promise<TipoVehiculoDto> {
    try {
        const record = await this.prisma.rto_tipo_vehiculo.update({
          where: { id },
          data: {
            abreviatura: data.abreviatura,
            codigo: data.codigo,
            tipo: data.tipo,
            motorizado: data.motorizado,
            codigovehtpo: data.codigoVehTpo,
            codigovehtpootr: data.codigoVehTpoOtr,
            activo: data.activo,
          },
        });

        return this.mapToDto(record);
      } catch (error) {
        handlePrismaError(error, 'tipo_vehiculo');
      }
  }

}