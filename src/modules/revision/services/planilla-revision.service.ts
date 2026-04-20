import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanillaRevisionRepository } from '../repositories/planilla-revision.repository';
import { PlanillaRevisionFilterDto } from '../dtos/planilla-revision-filter.dto';
import { plainToInstance } from 'class-transformer';
import { PlanillaRevisionResponseDto } from '../dtos/planilla-revision.dto';
import { PlanillaRevisionDetalleDto } from '../dtos/planilla-revision-detalle.dto';
import { PaginatedResponseDto } from '@/src/common/dtos/paginated-response.dto';
import { PlanillaRevision } from '@/src/model';

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


    // async findByDominio(dominio: string): Promise<Vehiculo> {
    //   const vehiculos = await this.repository.findByDominio(dominio);
  
    //   if (!vehiculos || vehiculos.length === 0) {
    //     throw new NotFoundException(
    //       `No se encontró el vehículo para el dominio informado ${dominio}`,
    //     );
    //   }
  
    //   return plainToInstance(Vehiculo, vehiculos[0], {
    //     excludeExtraneousValues: true,
    //   });
    // }

  async getDetalleCompleto(id: string): Promise<PlanillaRevision> {
  
    let bigIntId: bigint;
    try {
      bigIntId = BigInt(id);
    } catch {
      throw new NotFoundException(`El ID proporcionado no es válido.`);
    }
  
    const record = this.planillaRevisionRepository.findDetalleById(bigIntId).then((record) => {record});

    if (!record) {
      throw new NotFoundException(`Planilla de revisión con ID ${id} no encontrada.`);
    }

     return plainToInstance(PlanillaRevision, record, {
        excludeExtraneousValues: true,
      });
  }
}
