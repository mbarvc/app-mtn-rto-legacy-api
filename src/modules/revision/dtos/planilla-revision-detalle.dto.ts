import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class PlanillaRevisionDetalleDto {
  @ApiProperty({ example: '100293847' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

  // Campo Calculado en memoria: Aclaración de vigencia
  @ApiProperty({ description: 'Indica si la revisión aún no ha vencido' })
  @Expose()
  get revisionVigente(): boolean {
    if (!this.vencimiento) return false;
    // Compara la fecha de vencimiento con la fecha actual
    return new Date() < new Date(this.vencimiento);
  }

  @ApiProperty({ description: 'Suele ser 2014' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  version: string;

  @ApiProperty()
  @Expose({ name: 'nro_planilla' })
  numeroPlanilla: number;

  @ApiProperty()
  @Expose()
  dominio: string;

  @ApiProperty()
  @Expose()
  fecha: Date;

  @ApiPropertyOptional()
  @Expose()
  vencimiento: Date;

  // --- APLANAMIENTO DE RELACIONES (FLATTENING) ---

  @ApiPropertyOptional({ description: 'Año modelo del vehículo' })
  @Expose()
  @Transform(({ obj }) => obj.vehiculo?.anio)
  anioModelo: number | null;

  @ApiPropertyOptional({ description: 'Tipo de vehículo' })
  @Expose()
  @Transform(({ obj }) => obj.vehiculo?.tipo_vehiculo?.tipo)
  tipoVehiculo: string | null;

  @ApiPropertyOptional({ description: 'Categoría del vehículo' })
  @Expose()
  @Transform(({ obj }) => obj.vehiculo?.categoria_vehiculo?.categoria)
  categoria: string | null;

  @ApiPropertyOptional({ description: 'Formato: Denominacion (Alcance - Descripción)' })
  @Expose()
  @Transform(({ obj }) => {
    const c = obj.convenio;
    // Si no hay convenio en absoluto, devolvemos null
    if (!c) return null;

    const denominacion = c.denominacion || '';
    const alcance = c.alcance_convenio?.alcance || '';
    const descripcion = c.tipo_certificado?.descripcion || '';

    // Si por algún error de data legacy no hay alcance ni descripción, 
    // evitamos imprimir paréntesis vacíos "()" o "( - )"
    if (!alcance && !descripcion) {
      return denominacion.trim() || null;
    }

    // Retornamos el string formateado
    return `${denominacion} (${alcance} - ${descripcion})`.trim();
  })
  convenio: string | null;

  @ApiPropertyOptional()
  @Expose()
  @Transform(({ obj }) => obj.resultado?.texto)
  resultado: string | null;

  @ApiPropertyOptional()
  @Expose()
  @Transform(({ obj }) => obj.tipo_uso?.abreviatura)
  tipoUso: string | null;

  @ApiPropertyOptional({ description: 'Concatena Serie y Número del certificado' })
  @Expose()
  @Transform(({ obj }) => {
    const cert = obj.certificado_planilla_revision_certificado_idTocertificado;
    if (!cert) return null;
    return `${cert.serie || ''} ${cert.numero || ''}`.trim();
  })
  certificado: string | null;

  @ApiPropertyOptional({ description: 'Formato: (Cod) Razon Social' })
  @Expose()
  @Transform(({ obj }) => {
    if (!obj.taller) return null;
    return `(${obj.taller.cod_taller}) ${obj.taller.razon_social}`;
  })
  taller: string | null;
}