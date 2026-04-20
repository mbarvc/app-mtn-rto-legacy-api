import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { AnomaliasRepository } from '../repositories/anomalia.repository';

@Injectable()
export class AnomaliasService {
  private readonly logger = new Logger(AnomaliasService.name);

  constructor(private readonly repository: AnomaliasRepository) {}

  async getAll() {
    return this.repository.findAll();
  }

  async getById(idStr: string) {
    // Transformamos el string de la URL a BigInt
    const id = BigInt(idStr);
    const anomalia = await this.repository.findById(id);
    
    if (!anomalia) {
      throw new NotFoundException(`Anomalía con ID ${idStr} no encontrada`);
    }
    return anomalia;
  }

}