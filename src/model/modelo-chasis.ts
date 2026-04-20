import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { MarcaChasis } from './marca-chasis';
import { TipoVehiculo } from './tipo-vehiculo';

export class ModeloChasis {
  @ApiProperty({
    description: 'Identificador único del modelo de chasis',
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
    description: 'Descripción o nombre del modelo de chasis',
    example: 'OF 1721',
  })
  @Expose()
  modelo!: string;

  @ApiProperty({
    description: 'ID del tipo de vehículo asociado al modelo de chasis',
    example: 3,
  })
  @Transform(({ obj }) => obj.tipoVehiculoId ?? obj.tipo_vehiculo_id)
  @Expose()
  tipoVehiculoId!: bigint;

  @ApiProperty({
    description: 'ID de la marca de chasis',
    example: 10,
  })
  @Transform(({ obj }) => obj.marcaChasisId ?? obj.marca_chasis_id)
  @Expose()
  marcaChasisId!: bigint;

  @ApiProperty({
    description: 'ID del usuario o persona creadora',
    example: 100,
  })
  @Transform(({ obj }) => obj.creadorId ?? obj.creador_id)
  @Expose()
  creadorId!: bigint;

  @ApiPropertyOptional({
    description: 'Fecha de creación o alta del modelo',
    example: '2026-04-14T10:30:00.000Z',
  })
  @Expose()
  fecha?: Date;

  @ApiProperty({
    description: 'Indica si el modelo de chasis está activo',
    example: true,
  })
  @Expose()
  activo!: boolean;

  @ApiPropertyOptional({
    description: 'Fecha de ruta o sincronización',
    example: '2026-04-14T10:30:00.000Z',
  })
  @Expose()
  fecharuta?: Date;

  @ApiProperty({
    description: 'Hash del modelo de chasis',
    example: 'abc123hashmodelo',
  })
  @Transform(({ obj }) => obj.hashModelo ?? obj.hash_modelo)
  @Expose()
  hashModelo!: string;

  @ApiProperty({
    description: 'Tipo de vehículo asociado',
    type: () => TipoVehiculo,
  })
  @Type(() => TipoVehiculo)
  @Transform(({ obj, options }) => {
    const raw = obj.tipoVehiculo ?? obj.tipo_vehiculo;
    if (!raw) return null;
    return plainToInstance(TipoVehiculo, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  tipoVehiculo!: TipoVehiculo;

  @ApiProperty({
    description: 'Marca de chasis asociada',
    type: () => MarcaChasis,
  })
  @Type(() => MarcaChasis)
  @Transform(({ obj, options }) => {
    const raw = obj.marcaChasis ?? obj.marca_chasis;
    if (!raw) return null;
    return plainToInstance(MarcaChasis, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  marcaChasis!: MarcaChasis;
}
