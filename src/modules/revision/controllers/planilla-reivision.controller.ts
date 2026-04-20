import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { PlanillaRevisionService } from '../services/planilla-revision.service';
import { PlanillaRevisionFilterDto } from '../dtos/planilla-revision-filter.dto';
import { ApiPaginatedResponse } from '@/src/common/decorators/api-paginated-response.decorator';
import { PlanillaRevisionResponseDto } from '../dtos/planilla-revision.dto';
import { PlanillaRevisionDetalleCompletoResponse } from '../dtos/planilla-revision-detalle-completo.dto';

@ApiTags('Planilla Revision')
@Controller('planillas-revision')
export class PlanillaRevisionController {
  constructor(private readonly planillaRevisionService: PlanillaRevisionService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las planillas de revisión' })
  @ApiPaginatedResponse(PlanillaRevisionResponseDto)
  findBy(@Query() query: PlanillaRevisionFilterDto) {
    return this.planillaRevisionService.findBy(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una planilla de revisión por ID' })
  @ApiResponse({ status: 200, description: 'Planilla retornada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Planilla no encontrada.' })
  findOne(@Param('id') id: string) {
    return this.planillaRevisionService.findOne(id);
  }
  @Get(':id/detalle')
  @ApiOperation({ summary: 'Obtener una planilla de revisión por ID' })
  @ApiResponse({ status: 200, description: 'Planilla retornada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Planilla no encontrada.' })
  findOneDetalle(@Param('id') id: string) {
    return this.planillaRevisionService.getDetalle(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una planilla de revisión por ID' })
  @ApiResponse({ status: 200, description: 'La planilla ha sido actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Planilla no encontrada.' })
  update(@Param('id') id: string, @Body() updatePlanillaRevisionDto: any) {
    return this.planillaRevisionService.update(id, updatePlanillaRevisionDto);
  }


    @Get(':id/detalle-completo')
  @ApiOperation({ summary: 'Obtener una planilla de revisión completa, consolidando datos técnicos, resultados y relaciones' })
  @ApiOkResponse({ description: 'Vehiculo encontrado', type: PlanillaRevisionDetalleCompletoResponse })
  @ApiNotFoundResponse({ description: 'Planilla no encontrada.' })
  @ApiParam({ name: 'id', example: '15768131', description: 'id de la planilla de revisión' })
  getDetalleCompleto(@Param('id') id: string): Promise<PlanillaRevisionDetalleCompletoResponse>  {
    return this.planillaRevisionService.getDetalleCompleto(id);
  }
}