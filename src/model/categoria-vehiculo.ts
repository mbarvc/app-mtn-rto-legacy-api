import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class CategoriaVehiculo {
  @ApiProperty({
    description: 'Identificador único de la categoría',
    example: 1,
  })
  @Expose()
  id!: bigint;

  @ApiProperty({
    description: 'Versión para control de concurrencia optimista',
    example: 1,
  })
  @Expose()
  version!: bigint;

  @ApiProperty({
    description: 'Indica si la categoría de vehículo está activa',
    example: true,
  })
  @Transform(({ obj }) => obj.activa ?? obj.activo)
  @Expose()
  activa!: boolean;

  @ApiProperty({
    description: 'Categoría del vehículo',
    example: 'M1',
  })
  @Expose()
  categoria!: string;

  @ApiProperty({
    description: 'Observaciones de la categoría del vehículo',
    example: 'Vehículo liviano para transporte de pasajeros',
  })
  @Expose()
  observaciones!: string;

  @ApiPropertyOptional({
    description: 'Peso mínimo permitido para la categoría',
    example: 0,
  })
  @Transform(({ obj }) => obj.pesoDesde ?? obj.peso_desde)
  @Expose()
  pesoDesde?: number;

  @ApiPropertyOptional({
    description: 'Peso máximo permitido para la categoría',
    example: 3500,
  })
  @Transform(({ obj }) => obj.pesoHasta ?? obj.peso_hasta)
  @Expose()
  pesoHasta?: number;

  @ApiPropertyOptional({
    description: 'Cantidad mínima de asientos para la categoría',
    example: 2,
  })
  @Transform(({ obj }) => obj.asientosDesde ?? obj.asientos_desde)
  @Expose()
  asientosDesde?: number;

  @ApiPropertyOptional({
    description: 'Cantidad máxima de asientos para la categoría',
    example: 9,
  })
  @Transform(({ obj }) => obj.asientosHasta ?? obj.asientos_hasta)
  @Expose()
  asientosHasta?: number;

  @ApiPropertyOptional({
    description: 'Cantidad de ruedas para la categoría',
    example: 4,
  })
  @Transform(({ obj }) => obj.cantidadRuedas ?? obj.cantidad_ruedas)
  @Expose()
  cantidadRuedas?: number;

  @ApiPropertyOptional({
    description: 'Cilindrada mínima para la categoría',
    example: 1000,
  })
  @Transform(({ obj }) => obj.cilindradaDesde ?? obj.cilindrada_desde)
  @Expose()
  cilindradaDesde?: number;

  @ApiPropertyOptional({
    description: 'Cilindrada máxima para la categoría',
    example: 2500,
  })
  @Transform(({ obj }) => obj.cilindradaHasta ?? obj.cilindrada_hasta)
  @Expose()
  cilindradaHasta?: number;

  @ApiPropertyOptional({
    description: 'Velocidad mínima para la categoría',
    example: 0,
  })
  @Transform(({ obj }) => obj.velocidadDesde ?? obj.velocidad_desde)
  @Expose()
  velocidadDesde?: number;

  @ApiPropertyOptional({
    description: 'Velocidad máxima para la categoría',
    example: 130,
  })
  @Transform(({ obj }) => obj.velocidadHasta ?? obj.velocidad_hasta)
  @Expose()
  velocidadHasta?: number;
}
