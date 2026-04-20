import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class TipoCarroceria {
  @ApiProperty({
    description: 'Identificador único del tipo de carrocería',
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
    description: 'Código del tipo de carrocería',
    example: 'FURGON',
  })
  @Expose()
  codigo!: string;

  @ApiProperty({
    description: 'Descripción del tipo de carrocería',
    example: 'Furgón',
  })
  @Expose()
  tipo!: string;

  @ApiPropertyOptional({
    description: 'Indica si el tipo de carrocería está activo',
    example: true,
  })
  @Expose()
  activa?: boolean;

  @ApiPropertyOptional({
    description: 'Identificador de tecnología/red asociado',
    example: 10,
  })
  @Transform(({ obj }) => obj.idTecnoRed ?? obj.id_tecno_red)
  @Expose()
  idTecnoRed?: number;
}
