import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { Pais } from './pais';

export class Provincia {
  @ApiProperty({
    description: 'Identificador único de la provincia',
    example: 2,
  })
  @Expose()
  id!: bigint;

  @ApiProperty({
    description: 'Versión para control de concurrencia optimista',
    example: 1,
  })
  version!: bigint;

  @ApiProperty({
    description: 'Nombre de la provincia',
    example: 'Buenos Aires',
  })
  @Expose()
  nombre!: string;

  @ApiProperty({
    description: 'ID del país al que pertenece la provincia',
    example: 1,
  })
  @Transform(({ obj }) => obj.paisId ?? obj.pais_id)
  paisId!: bigint;

  @ApiProperty({
    description: 'Código único de la provincia',
    example: 'BUE',
  })
  @Expose()
  codigo!: string;

  @ApiPropertyOptional({
    description: 'Código interno de provincia RTO',
    example: 'B',
  })
  @Transform(({ obj }) => obj.codProvinciarto ?? obj.cod_provinciarto)
  @Expose()
  codProvinciarto?: string;

  @ApiProperty({
    description: 'País al que pertenece la provincia',
    type: () => Pais,
  })
  @Type(() => Pais)
  @Transform(({ obj, options }) => {
    const raw = obj.pais;
    if (!raw) return null;
    return plainToInstance(Pais, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  pais!: Pais;
}
