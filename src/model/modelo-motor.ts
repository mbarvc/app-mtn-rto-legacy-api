import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { MarcaMotor } from './marca-motor';
import { TipoCombustible } from './tipo-combustible';

export class ModeloMotor {
  @ApiProperty({
    description: 'Identificador único del modelo de motor',
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
    description: 'ID del tipo de combustible asociado',
    example: 2,
  })
  @Transform(({ obj }) => obj.combustibleId ?? obj.combustible_id)
  @Expose()
  combustibleId!: bigint;

  @ApiProperty({
    description: 'Descripción o nombre del modelo de motor',
    example: 'ISB 6.7',
  })
  @Expose()
  modelo!: string;

  @ApiProperty({
    description: 'ID de la marca de motor',
    example: 5,
  })
  @Transform(({ obj }) => obj.marcaMotorId ?? obj.marca_motor_id)
  @Expose()
  marcaMotorId!: bigint;

  @ApiProperty({
    description: 'Indica si el modelo de motor está activo',
    example: true,
  })
  @Expose()
  activo!: boolean;

  @ApiProperty({
    description: 'ID del usuario o persona creadora',
    example: 100,
  })
  @Transform(({ obj }) => obj.creadorId ?? obj.creador_id)
  @Expose()
  creadorId!: bigint;

  @ApiProperty({
    description: 'Fecha de creación o alta del modelo',
    example: '2026-04-14T10:30:00.000Z',
  })
  @Expose()
  fecha!: Date;

  @ApiProperty({
    description: 'Hash del modelo de motor',
    example: 'hash-modelo-motor-001',
  })
  @Transform(({ obj }) => obj.hashModelo ?? obj.hash_modelo)
  @Expose()
  hashModelo!: string;

  @ApiProperty({
    description: 'Tipo de combustible asociado',
    type: () => TipoCombustible,
  })
  @Type(() => TipoCombustible)
  @Transform(({ obj, options }) => {
    const raw = obj.tipoCombustible ?? obj.tipo_combustible;
    if (!raw) return null;
    return plainToInstance(TipoCombustible, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  tipoCombustible!: TipoCombustible;

  @ApiProperty({
    description: 'Marca del motor asociada',
    type: () => MarcaMotor,
  })
  @Type(() => MarcaMotor)
  @Transform(({ obj, options }) => {
    const raw = obj.marcaMotor ?? obj.marca_motor;
    if (!raw) return null;
    return plainToInstance(MarcaMotor, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  marcaMotor!: MarcaMotor;
}
