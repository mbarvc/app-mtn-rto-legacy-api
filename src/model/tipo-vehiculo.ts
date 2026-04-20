import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TipoVehiculo {
  @ApiProperty({ description: 'Identificador único', example: 1 })
  @Expose()
  id: bigint;

  @ApiProperty({
    description: 'Versión para control de concurrencia optimista',
    example: 1,
  })
  version: bigint;

  @ApiProperty({
    description: 'Abreviatura única del tipo de vehículo',
    example: 'CAM',
  })
  @Expose()
  abreviatura: string;

  @ApiProperty({
    description: 'Código único del tipo de vehículo',
    example: 'CAMION',
  })
  @Expose()
  codigo: string;

  @ApiProperty({
    description: 'Descripción del tipo de vehículo',
    example: 'Camión',
  })
  @Expose()
  tipo: string;

  @ApiPropertyOptional({
    description: 'Indica si el vehículo es motorizado',
    example: true,
  })
  motorizado?: boolean;

  @ApiPropertyOptional({
    description: 'Código de tipo de vehículo (campo externo)',
    example: '01',
  })
  codigovehtpo?: string;

  @ApiPropertyOptional({
    description: 'Código alternativo de tipo de vehículo',
    example: '02',
  })
  codigovehtpootr?: string;

  @ApiProperty({
    description: 'Indica si el tipo de vehículo está activo',
    example: true,
    default: false,
  })
  activo: boolean;
}
