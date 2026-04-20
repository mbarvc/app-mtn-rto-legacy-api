import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { Provincia } from './provincia';

export class Localidad {
  @ApiProperty({
    description: 'Identificador único de la localidad',
    example: 10,
  })
  @Expose()
  id!: bigint;

  @ApiProperty({
    description: 'Versión para control de concurrencia optimista',
    example: 1,
  })
  version!: bigint;

  @ApiPropertyOptional({
    description: 'Abreviatura de la localidad',
    example: 'CABA',
  })
  @Expose()
  abreviatura?: string;

  @ApiPropertyOptional({
    description: 'Código postal de la localidad',
    example: '1414',
  })
  @Transform(({ obj }) => obj.codigoPostal ?? obj.codigo_postal)
  @Expose()
  codigoPostal?: string;

  @ApiProperty({
    description: 'Nombre de la localidad',
    example: 'Ciudad Autónoma de Buenos Aires',
  })
  @Expose()
  nombre!: string;

  @ApiProperty({
    description: 'ID de la provincia a la que pertenece la localidad',
    example: 2,
  })
  @Transform(({ obj }) => obj.provinciaId ?? obj.provincia_id)
  @Expose()
  provinciaId!: bigint;

  @ApiPropertyOptional({
    description: 'Indica si la localidad está activa',
    example: true,
  })
  activo?: boolean;

  @ApiPropertyOptional({
    description: 'ID del creador de la localidad',
    example: 100,
  })
  @Transform(({ obj }) => obj.creadorId ?? obj.creador_id)
  creadorId?: bigint;

  @ApiPropertyOptional({
    description: 'Fecha de creación del registro',
    example: '2026-04-14T10:30:00.000Z',
  })
  @Transform(({ obj }) => obj.dateCreated ?? obj.date_created)
  dateCreated?: Date;

  @ApiPropertyOptional({
    description: 'Hash de la localidad',
    example: 'abc123hash',
  })
  @Transform(({ obj }) => obj.hashLocalidad ?? obj.hash_localidad)
  hashLocalidad?: string;

  @ApiPropertyOptional({
    description: 'Fecha de última actualización',
    example: '2026-04-14T11:00:00.000Z',
  })
  @Transform(({ obj }) => obj.lastUpdated ?? obj.last_updated)
  lastUpdated?: Date;

  @ApiProperty({
    description: 'Provincia a la que pertenece la localidad',
    type: () => Provincia,
  })
  @Type(() => Provincia)
  @Transform(({ obj, options }) => {
    const raw = obj.provincia;
    if (!raw) return null;
    return plainToInstance(Provincia, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  provincia!: Provincia;
}
