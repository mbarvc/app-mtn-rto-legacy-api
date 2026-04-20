import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TipoCombustible {
  @ApiProperty({
    description: 'Identificador único del tipo de combustible',
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
    description: 'Código del tipo de combustible',
    example: 'DIESEL',
  })
  @Expose()
  codigo!: string;

  @ApiProperty({
    description: 'Descripción del tipo de combustible',
    example: 'Diésel',
  })
  @Expose()
  tipo!: string;
}
