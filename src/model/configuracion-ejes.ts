import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ConfiguracionEjes {
  @ApiProperty({
    description: 'Identificador único de la configuración de ejes',
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
    description: 'Cantidad de ejes de la configuración',
    example: 3,
  })
  @Transform(({ obj }) => obj.cantEjes ?? obj.cant_ejes)
  @Expose()
  cantEjes!: number;

  @ApiProperty({
    description: 'Capacidad máxima permitida para la configuración',
    example: 45000,
  })
  @Transform(({ obj }) => obj.capacidadMaxima ?? obj.capacidad_maxima)
  @Expose()
  capacidadMaxima!: number;

  @ApiProperty({
    description: 'Descripción de la configuración de ejes',
    example: '2+1',
  })
  @Expose()
  configuracion!: string;

  @ApiProperty({
    description: 'Indica si la configuración es frecuente',
    example: true,
  })
  @Expose()
  frecuente!: boolean;

  @ApiPropertyOptional({
    description: 'Capacidad máxima para configuración súper ancha',
    example: 52000,
  })
  @Transform(({ obj }) => obj.capacidadSuperAncha ?? obj.capacidad_super_ancha)
  @Expose()
  capacidadSuperAncha?: number;

  @ApiPropertyOptional({
    description: 'Indica si la configuración admite súper ancha',
    example: true,
  })
  @Transform(({ obj }) => obj.superAncha ?? obj.super_ancha)
  @Expose()
  superAncha?: boolean;
}
