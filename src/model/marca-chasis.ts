import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MarcaChasis {
  @ApiProperty({
    description: 'Identificador único de la marca de chasis',
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
    description: 'Nombre de la marca del chasis',
    example: 'Mercedes-Benz',
  })
  @Expose()
  marca!: string;
}
