import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanillaRevisionRepository } from '../repositories/planilla-revision.repository';
import { PlanillaRevisionFilterDto } from '../dtos/planilla-revision-filter.dto';
import { plainToInstance } from 'class-transformer';
import { PlanillaRevisionResponseDto } from '../dtos/planilla-revision.dto';
import { PlanillaRevisionDetalleDto } from '../dtos/planilla-revision-detalle.dto';
import { PaginatedResponseDto } from '@/src/common/dtos/paginated-response.dto';

@Injectable()
export class PlanillaRevisionService {
  constructor(private readonly planillaRevisionRepository: PlanillaRevisionRepository) {}

  async findBy(query: PlanillaRevisionFilterDto): Promise<PaginatedResponseDto<PlanillaRevisionResponseDto>> {
    const { records, meta } = await this.planillaRevisionRepository.findBy(query);

    const transformedData = plainToInstance(PlanillaRevisionResponseDto, records, {
      excludeExtraneousValues: true,
    });
    
    return {
      data: transformedData,
      meta,
    };
  }

  findOne(id: string) {
    return `This action returns a #${id} planillaRevision`;
  }

  update(id: string, updatePlanillaRevisionDto: any) {
    return `This action updates a #${id} planillaRevision`;
  }

  async getDetalle(id: string) {
    // 1. Casteamos a BigInt con seguridad
    let bigIntId: bigint;
    try {
      bigIntId = BigInt(id);
    } catch {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }

    // 2. Buscamos en la base de datos
    const record = await this.planillaRevisionRepository.findDetalleById(bigIntId);

    if (!record) {
      throw new NotFoundException(`Planilla de revisión con ID ${id} no encontrada.`);
    }

    // 3. Transformamos usando el DTO que "aplana" los datos
    const rta = plainToInstance(PlanillaRevisionDetalleDto, record, {
      excludeExtraneousValues: true,
    });

    return rta;
  }


  async getDetalleCompleto(id: string) {
    // 1. Casteamos a BigInt con seguridad
    let bigIntId: bigint;
    try {
      bigIntId = BigInt(id);
    } catch {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }

    // 2. Buscamos en la base de datos
    const record = await this.planillaRevisionRepository.findDetalleById(bigIntId);

    if (!record) {
      throw new NotFoundException(`Planilla de revisión con ID ${id} no encontrada.`);
    }

    // 3. Transformamos usando el DTO que "aplana" los datos
    const rta = plainToInstance(PlanillaRevisionDetalleDto, record, {
      excludeExtraneousValues: true,
    });

    return rta;
  }
}
