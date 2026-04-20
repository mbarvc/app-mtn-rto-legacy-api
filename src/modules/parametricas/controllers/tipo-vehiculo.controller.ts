import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { TipoVehiculoDto, CreateTipoVehiculoDto, UpdateTipoVehiculoDto } from '../dtos/tipo-vehiculo.dto';
import { TiposVehiculoService } from '../services/tipo-vehiculo.service';

@ApiTags('Tipos de Vehículo')
@Controller('tipos-vehiculo') // Sacamos el /legacy de la ruta también
export class TiposVehiculoController {
  constructor(private readonly tiposService: TiposVehiculoService) {}

  @Get()
  @ApiOperation({ summary: 'Listar tipos de vehículo activos' })
  @ApiResponse({ status: 200, type: [TipoVehiculoDto] })
  getAll() {
    return this.tiposService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de vehículo por ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: TipoVehiculoDto })
  getById(@Param('id') id: string) {
    return this.tiposService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modificar tipo de vehículo' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({ status: 200, type: TipoVehiculoDto })
  update(@Param('id') id: string, @Body() dto: UpdateTipoVehiculoDto) {
    return this.tiposService.update(id, dto);
  }


}