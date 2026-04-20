import { Module } from '@nestjs/common';
import { VehiculoController } from './controllers/vehiculo.controller';
import { VehiculoService } from './services/vehiculo.service';
import { VehiculoRepository } from './repositories';

@Module({
  controllers: [VehiculoController],
  providers: [VehiculoService, VehiculoRepository]
})
export class VehiculoModule {}
