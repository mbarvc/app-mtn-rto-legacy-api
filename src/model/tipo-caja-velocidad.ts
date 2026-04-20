import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TipoCajaVelocidad {
  @ApiProperty({
    description: 'Identificador único del tipo de caja de velocidad',
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
    description: 'Abreviatura del tipo de caja de velocidad',
    example: 'MAN',
  })
  @Expose()
  abreviatura!: string;

  @ApiProperty({
    description: 'Código del tipo de caja de velocidad',
    example: '01',
  })
  @Expose()
  codigo!: string;

  @ApiProperty({
    description: 'Descripción del tipo de caja de velocidad',
    example: 'Manual',
  })
  @Expose()
  tipo!: string;
}
