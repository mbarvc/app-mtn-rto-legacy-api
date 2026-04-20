import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoVehiculoDto, UpdateTipoVehiculoDto } from '../dtos/tipo-vehiculo.dto';
import { TiposVehiculoRepository } from '../repositories/tipo-vehiculo.repository';

@Injectable()
export class TiposVehiculoService {
  constructor(private readonly repository: TiposVehiculoRepository) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(idStr: string) {
    const tipo = await this.repository.findById(BigInt(idStr));
    if (!tipo) {
      throw new NotFoundException(`Tipo de vehículo con ID ${idStr} no encontrado`);
    }
    return tipo;
  }

  async update(idStr: string, data: UpdateTipoVehiculoDto) {
    await this.getById(idStr); // Valida que exista
    return this.repository.update(BigInt(idStr), data);
  }

}