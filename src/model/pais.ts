import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Pais {
  @ApiProperty({
    description: 'Identificador único del país',
    example: 1,
  })
  @Expose()
  id!: bigint;

  @ApiProperty({
    description: 'Versión para control de concurrencia optimista',
    example: 1,
  })
  version!: bigint;

  @ApiProperty({
    description: 'Abreviatura del país',
    example: 'AR',
  })
  @Expose()
  abreviatura!: string;

  @ApiProperty({
    description: 'Código único del país',
    example: 'ARG',
  })
  @Expose()
  codigo!: string;

  @ApiPropertyOptional({
    description: 'Indica si el país es frecuente',
    example: true,
  })
  frecuente?: boolean;

  @ApiProperty({
    description: 'Nombre del país',
    example: 'Argentina',
  })
  @Expose()
  nombre!: string;
}
