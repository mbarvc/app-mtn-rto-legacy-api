import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { TipoUso } from './tipo-uso';
import { Certificado } from './certificado';

export class PlanillaRevision {
  @ApiProperty({ example: '100293847', description: 'Identificador único de la planilla' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

  @ApiPropertyOptional({ description: 'Versión de control de concurrencia' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  version?: string;

  @ApiProperty({ description: 'Dominio del vehículo inspeccionado' })
  @Expose()
  dominio: string;

  @ApiProperty({ description: 'Fecha de creación de la revisión' })
  @Expose()
  fecha: Date;

  @ApiPropertyOptional({ description: 'Inicio de la revisión' })
  @Expose({ name: 'inicio_revision' })
  inicioRevision?: Date;

  @ApiPropertyOptional({ description: 'Fin de la revisión' })
  @Expose({ name: 'fin_revision' })
  finRevision?: Date;

  @ApiProperty({ description: 'Indica si el vehículo fue validado' })
  @Expose({ name: 'vehiculo_validado' })
  vehiculoValidado: boolean;

  @ApiPropertyOptional({ description: 'Indica si la planilla fue impresa' })
  @Expose()
  impresa?: boolean;

  @ApiPropertyOptional({ description: 'ID del taller CNRT' })
  @Expose({ name: 'cod_taller' })
  codTaller?: number;

  @ApiPropertyOptional({ description: 'ID del taller interno' })
  @Expose({ name: 'taller_id' })
  @Transform(({ value }) => value?.toString())
  tallerId?: string;

  @ApiProperty({ description: 'Resultado de la revisión (ID)' })
  @Expose({ name: 'resultado_id' })
  @Transform(({ value }) => value?.toString())
  resultadoId: string;

  @ApiPropertyOptional({ description: 'ID del convenio' })
  @Expose({ name: 'convenio_id' })
  @Transform(({ value }) => value?.toString())
  convenioId?: string;

  @ApiPropertyOptional({ description: 'ID de línea de inspección' })
  @Expose({ name: 'linea_inspeccion_id' })
  @Transform(({ value }) => value?.toString())
  lineaInspeccionId?: string;

  @ApiPropertyOptional({ description: 'Fecha de vencimiento de la revisión' })
  @Expose({ name: 'vencimiento' })
  vencimiento?: Date;

  @ApiProperty({ description: 'Número de planilla' })
  @Expose({ name: 'nro_planilla' })
  numeroPlanilla: number;

  @ApiProperty({ description: 'ID del tipo de uso' })
  @Expose({ name: 'tipo_uso_id' })
  @Transform(({ value }) => value?.toString())
  tipoUsoId: string;

  @ApiPropertyOptional({ description: 'ID del vehículo asociado' })
  @Expose({ name: 'vehiculo_id' })
  @Transform(({ value }) => value?.toString())
  vehiculoId?: string;

  @ApiPropertyOptional({ description: 'ID del titular' })
  @Expose({ name: 'titular_id' })
  @Transform(({ value }) => value?.toString())
  titularId?: string;

  @ApiPropertyOptional({ description: 'ID del operador' })
  @Expose({ name: 'operador_id' })
  @Transform(({ value }) => value?.toString())
  operadorId?: string;

  @ApiPropertyOptional({ description: 'ID del inspector' })
  @Expose({ name: 'inspector_id' })
  @Transform(({ value }) => value?.toString())
  inspectorId?: string;

  @ApiPropertyOptional({ description: 'ID del director técnico' })
  @Expose({ name: 'director_tecnico_id' })
  @Transform(({ value }) => value?.toString())
  directorTecnicoId?: string;

  @ApiPropertyOptional({ description: 'ID de la localidad del titular' })
  @Expose({ name: 'localidad_titular_id' })
  @Transform(({ value }) => value?.toString())
  localidadTitularId?: string;

  @ApiPropertyOptional({ description: 'Nombre del titular declarado' })
  @Expose({ name: 'nombre_titular' })
  nombreTitular?: string;

  @ApiPropertyOptional({ description: 'Domicilio del titular declarado' })
  @Expose({ name: 'domicilio_titular' })
  domicilioTitular?: string;

  @ApiPropertyOptional({ description: 'Observaciones de la revisión' })
  @Expose()
  observaciones?: string;

  @ApiPropertyOptional({ description: 'Constancia de validación' })
  @Expose({ name: 'constancia_validacion' })
  constanciaValidacion?: string;

  @ApiPropertyOptional({ description: 'Fecha de validación' })
  @Expose({ name: 'fecha_validacion' })
  fechaValidacion?: Date;

  @ApiPropertyOptional({ description: 'Última actualización de la planilla' })
  @Expose({ name: 'last_updated' })
  lastUpdated?: Date;

  @ApiPropertyOptional({
    description: 'ID del certificado asociado a la planilla de revisión',
    example: 3,
  })
  @Transform(({ obj }) => obj.certificadoId ?? obj.certificado_id)
  @Expose()
  @Transform(({ value }) => value?.toString())
  certificadoId?: string;

  @ApiProperty({ name: 'resultado', description: 'Resultado textual de la revisión' })
  @Expose({ name: 'resultado' })
  @Transform(({ obj }) => obj.resultado?.texto)
  resultado: string;

  @ApiProperty({ name: 'tipoUso', description: 'Tipo de uso declarado para la planilla' })
  @Expose({ name: 'tipo_uso' })
  @Type(() => TipoUso)
  tipoUso: TipoUso;

  @ApiPropertyOptional({
    description: 'Información del certificado asociado a la planilla de revisión',
    type: () => Certificado,
  })
  @Transform(({ obj, options }) => {
    const raw =
      obj.certificado ??
      obj.Certificado ??
      obj.certificado_planilla_revision_certificado_idTocertificado;
    if (!raw) return null;
    return plainToInstance(Certificado, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  certificado?: Certificado;
}
