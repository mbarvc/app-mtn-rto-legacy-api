import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/src/prisma/prisma.service';
import { AnomaliaDto } from '../dtos/anomalia.dto';

@Injectable()
export class AnomaliasRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Función privada de ayuda para no repetir el mapeo en cada método
  private mapToDto(raw: any): AnomaliaDto {
    return {
      id: raw.id.toString(),
      activa: raw.activa ?? false,
      anomaliaPadreId: raw.anomalia_padre_id ? raw.anomalia_padre_id.toString() : null,
      codigo: raw.codigo,
      codigoNivel: raw.codigo_nivel,
      descripcion: raw.descripcion,
      esGrave: raw.es_grave,
      esModerada: raw.es_moderada,
      esLeve: raw.es_leve,
      nivel: raw.nivel,
    };
  }

  async findAll(): Promise<AnomaliaDto[]> {
    const records = await this.prisma.anomalia.findMany({
      where: { activa: true },
    });
    return records.map((record) => this.mapToDto(record));
  }

  async findById(id: bigint): Promise<AnomaliaDto | null> {
    const record = await this.prisma.anomalia.findUnique({ 
      where: { id } 
    });
    return record ? this.mapToDto(record) : null;
  }

}