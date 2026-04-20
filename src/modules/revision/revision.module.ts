import { Module } from '@nestjs/common';
import { PlanillaRevisionController } from './controllers';
import { PlanillaRevisionService } from './services';
import { PlanillaRevisionRepository } from './repositories/planilla-revision.repository';


@Module({
  controllers: [
    PlanillaRevisionController
  ],
  providers: [
    PlanillaRevisionService,
    PlanillaRevisionRepository
  ],
})
export class RevisionModule {}