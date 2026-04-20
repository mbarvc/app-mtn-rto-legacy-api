import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { VehiculoRepository } from '../repositories';
import { Vehiculo } from '@/src/model';
import { vehiculo } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class VehiculoService {
  private readonly logger = new Logger(VehiculoRepository.name);

  constructor(private readonly repository: VehiculoRepository) {}

  async findByDominio(dominio: string): Promise<Vehiculo> {
    const vehiculos = await this.repository.findByDominio(dominio);

    if (!vehiculos || vehiculos.length === 0) {
      throw new NotFoundException(
        `No se encontró el vehículo para el dominio informado ${dominio}`,
      );
    }

    return plainToInstance(Vehiculo, vehiculos[0], {
      excludeExtraneousValues: true,
    });
  }
}
