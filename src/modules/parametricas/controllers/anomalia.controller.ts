import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AnomaliasService } from '../services/anomalia.service';

@ApiTags('Anomalías Legacy')
@Controller('anomalias')
export class AnomaliasController {
  constructor(private readonly anomaliasService: AnomaliasService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las anomalías activas' })
  @ApiResponse({ status: 200, description: 'Listado obtenido exitosamente.' })
  getAll() {
    return this.anomaliasService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una anomalía por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la anomalía (String/BigInt)', example: '1257' })
  getById(@Param('id') id: string) {
    return this.anomaliasService.getById(id);
  }

}