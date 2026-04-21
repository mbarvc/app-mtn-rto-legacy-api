import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type, plainToInstance } from 'class-transformer';
import { Vehiculo } from './vehiculo';
import { Pais } from './pais';
import { Localidad } from './localidad';

export class PlanillaRevision {
  @ApiProperty({ example: 1 })
  @Expose()
  id!: bigint;

  @ApiProperty({ example: 1 })
  @Expose()
  version!: bigint;

  @ApiPropertyOptional({ example: 2.5 })
  @Expose()
  alto?: number;

  @ApiPropertyOptional({ example: 2.2 })
  @Expose()
  ancho?: number;

  @ApiPropertyOptional({ example: 10.5 })
  @Expose()
  largo?: number;

  @ApiProperty({ example: 'AB123CD' })
  @Expose()
  dominio!: string;

  @ApiProperty({ example: '2026-04-20T10:00:00.000Z' })
  @Expose()
  fecha!: Date;

  @ApiProperty({ example: '2026-04-20T10:05:00.000Z' })
  @Transform(({ obj }) => obj.inicioRevision ?? obj.inicio_revision)
  @Expose()
  inicioRevision!: Date;

  @ApiProperty({ example: '2026-04-20T10:45:00.000Z' })
  @Transform(({ obj }) => obj.finRevision ?? obj.fin_revision)
  @Expose()
  finRevision!: Date;

  @ApiProperty({ example: 12345 })
  @Transform(({ obj }) => obj.nroPlanilla ?? obj.nro_planilla)
  @Expose()
  nroPlanilla!: number;

  @ApiProperty({ example: true })
  @Transform(({ obj }) => obj.vehiculoValidado ?? obj.vehiculo_validado)
  @Expose()
  vehiculoValidado!: boolean;

  @ApiProperty({ example: true })
  @Expose()
  fotovalidada!: boolean;

  @ApiPropertyOptional({ example: 'Observaciones varias' })
  @Expose()
  observaciones?: string;

  @ApiPropertyOptional({ example: 'Juan Pérez' })
  @Transform(({ obj }) => obj.nombreTitular ?? obj.nombre_titular)
  @Expose()
  nombreTitular?: string;

  @ApiPropertyOptional({ example: 'Av. Siempre Viva 123' })
  @Transform(({ obj }) => obj.domicilioTitular ?? obj.domicilio_titular)
  @Expose()
  domicilioTitular?: string;

  @ApiPropertyOptional({ example: true })
  @Expose()
  reinspeccion?: boolean;

  @ApiPropertyOptional({ example: '2026-05-20T00:00:00.000Z' })
  @Expose()
  vencimiento?: Date;

  @ApiPropertyOptional({ example: 99 })
  @Transform(({ obj }) => obj.vehiculoId ?? obj.vehiculo_id)
  @Expose()
  vehiculoId?: bigint;

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ obj }) => obj.paisRadicacionId ?? obj.pais_radicacion_id)
  @Expose()
  paisRadicacionId!: bigint;

  @ApiPropertyOptional({ example: 20 })
  @Transform(({ obj }) => obj.localidadTitularId ?? obj.localidad_titular_id)
  @Expose()
  localidadTitularId?: bigint;

  @ApiPropertyOptional({ example: 30 })
  @Transform(({ obj }) => obj.resultadoId ?? obj.resultado_id)
  @Expose()
  resultadoId!: bigint;

  @ApiPropertyOptional({ example: 40 })
  @Transform(({ obj }) => obj.tallerId ?? obj.taller_id)
  @Expose()
  tallerId!: bigint;

  @ApiPropertyOptional({ example: 50 })
  @Transform(({ obj }) => obj.tipoUsoId ?? obj.tipo_uso_id)
  @Expose()
  tipoUsoId!: bigint;

  @ApiPropertyOptional({ example: 60 })
  @Transform(({ obj }) => obj.lineaInspeccionId ?? obj.linea_inspeccion_id)
  @Expose()
  lineaInspeccionId!: bigint;

  @ApiPropertyOptional({ type: () => Vehiculo })
  @Type(() => Vehiculo)
  @Transform(({ obj, options }) => {
    const raw = obj.vehiculo;
    if (!raw) return null;
    return plainToInstance(Vehiculo, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  vehiculo?: Vehiculo;

  @ApiPropertyOptional({ type: () => Pais })
  @Type(() => Pais)
  @Transform(({ obj, options }) => {
    const raw = obj.pais;
    if (!raw) return null;
    return plainToInstance(Pais, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  paisRadicacion?: Pais;

  @ApiPropertyOptional({ type: () => Localidad })
  @Type(() => Localidad)
  @Transform(({ obj, options }) => {
    const raw = obj.localidad;
    if (!raw) return null;
    return plainToInstance(Localidad, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  localidadTitular?: Localidad;
}
