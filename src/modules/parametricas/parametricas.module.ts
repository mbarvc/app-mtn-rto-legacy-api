import { Module } from '@nestjs/common';
import { AnomaliasController, TiposVehiculoController } from './controllers';
import { AnomaliasService, TiposVehiculoService } from './services';
import { AnomaliasRepository, TiposVehiculoRepository } from './repositories';

// Importá también tu PrismaModule si no está declarado como global

@Module({
  controllers: [
    AnomaliasController,
    TiposVehiculoController
  ],
  providers: [
    AnomaliasService,
    AnomaliasRepository,
    TiposVehiculoService,
    TiposVehiculoRepository
  ],
})
export class ParametricasModule {}