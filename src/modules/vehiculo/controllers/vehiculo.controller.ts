import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { VehiculoService } from '../services';
import { VehiculoResponse } from '../dtos/vehiculo.response.dto';


@ApiTags('Vehiculos')
@Controller('/vehiculos')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @Get('/')
  @ApiOperation({ summary: 'Obtener un Vehiculo por dominio' })
  @ApiOkResponse({ description: 'Vehiculo encontrado', type: VehiculoResponse })
  @ApiNotFoundResponse({ description: 'Vehiculo no encontrado' })
  @ApiQuery({
    name: 'dominio',
    example: 'AC167MK',
    description: 'Dominio del vehículo',
  })
  findByDominio(@Query('dominio') dominio: string): Promise<VehiculoResponse> {
    return this.vehiculoService
      .findByDominio(dominio)
      .then((vehiculo) => new VehiculoResponse(vehiculo));

  }
}
