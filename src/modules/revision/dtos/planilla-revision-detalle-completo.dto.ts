import { PlanillaRevision } from '@/src/model';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class PlanillaDto {
  @ApiProperty({ example: 15249290 })
  @Expose()
  id: number;

  @ApiProperty({ example: 1084517 })
  @Expose()
  numero: number;

  @ApiProperty({ example: '2025-10-22T00:00:00.000Z', format: 'date-time' })
  @Expose()
  fecha: string;

  @ApiProperty({ example: '2026-10-22T00:00:00.000Z', format: 'date-time' })
  @Expose()
  vencimiento: string;
}

class VehiculoDto {
  @ApiProperty({ example: 'AB123CD' })
  @Expose()
  dominio: string;

  @ApiProperty({ example: 2017 })
  @Expose()
  anioModelo: number;

  @ApiProperty({ example: 'Semirremolque' })
  @Expose()
  tipoVehiculo: string;

  @ApiProperty({ example: 'O4' })
  @Expose()
  categoria: string;

  @ApiProperty({ example: 'Mercosur' })
  @Expose()
  convenio: string;
}

class PersonaDto {
  @ApiProperty({ example: 'Transporte SA' })
  @Expose()
  nombre: string;

  @ApiProperty({ example: '30-12345678-9' })
  @Expose()
  cuit: string;
}

class OperadorDto {
  @ApiProperty({ example: 'Juan Perez' })
  @Expose()
  nombre: string;

  @ApiProperty({ example: '20-87654321-3' })
  @Expose()
  cuit: string;
}

class TallerDto {
  @ApiProperty({ example: 26 })
  @Expose()
  codigo: number;

  @ApiProperty({ example: 'El Trébol de Mendoza S.A.' })
  @Expose()
  nombre: string;
}

class CertificadoDto {
  @ApiProperty({ example: 'V' })
  @Expose()
  serie: string;

  @ApiProperty({ example: 593661 })
  @Expose()
  numero: number;
}

class MedidasDto {
  @ApiProperty({ example: 3.5 })
  @Expose()
  alto: number;

  @ApiProperty({ example: 12.0 })
  @Expose()
  largo: number;

  @ApiProperty({ example: 2.6 })
  @Expose()
  ancho: number;
}

class FrenoEjeDto {
  @ApiProperty({ example: 1 })
  @Expose()
  nroEje: number;

  @ApiProperty({ example: 53.24 })
  @Expose()
  eficiencia: number;

  @ApiProperty({ example: 5.39 })
  @Expose()
  desequilibrio: number;

  @ApiProperty({ example: 4.21 })
  @Expose()
  fuerzaDerecha: number;

  @ApiProperty({ example: 4.45 })
  @Expose()
  fuerzaIzquierda: number;

  @ApiProperty({ example: 1658 })
  @Expose()
  pesoBascula: number;

  @ApiProperty({ example: 8000 })
  @Expose()
  pesoMaximo: number;
}

class FrenosDto {
  @ApiProperty({ type: [FrenoEjeDto] })
  @Expose()
  @Type(() => FrenoEjeDto)
  ejes: FrenoEjeDto[];

  @ApiProperty({ example: 47.71 })
  @Expose()
  eficienciaTotal: number;
}

class FrenoEstacionamientoDto {
  @ApiProperty({ example: 20 })
  @Expose()
  eficiencia: number;
}

class EnsayosDto {
  @ApiProperty({ type: FrenosDto })
  @Expose()
  @Type(() => FrenosDto)
  frenos: FrenosDto;

  @ApiProperty({ type: FrenoEstacionamientoDto })
  @Expose()
  @Type(() => FrenoEstacionamientoDto)
  frenoEstacionamiento: FrenoEstacionamientoDto;
}

class AnomaliaDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ example: '240102' })
  @Expose()
  codigo: string;

  @ApiProperty({ example: 'PISO - DEYECCIONES' })
  @Expose()
  descripcion: string;

  @ApiProperty({ example: 'leve' })
  @Expose()
  tipo: string;
}

export class PlanillaRevisionDetalleCompletoDto {
  @ApiProperty({ type: PlanillaDto })
  @Expose()
  @Type(() => PlanillaDto)
  planilla: PlanillaDto;

  @ApiProperty({ type: VehiculoDto })
  @Expose()
  @Type(() => VehiculoDto)
  vehiculo: VehiculoDto;

  @ApiProperty({ type: PersonaDto })
  @Expose()
  @Type(() => PersonaDto)
  titular: PersonaDto;

  @ApiProperty({ type: OperadorDto })
  @Expose()
  @Type(() => OperadorDto)
  operador: OperadorDto;

  @ApiProperty({ type: TallerDto })
  @Expose()
  @Type(() => TallerDto)
  taller: TallerDto;

  @ApiProperty({ example: 'Apto' })
  @Expose()
  resultado: string;

  @ApiProperty({ example: 'Cargas Peligrosas' })
  @Expose()
  tipoUso: string;

  @ApiProperty({ type: CertificadoDto })
  @Expose()
  @Type(() => CertificadoDto)
  certificado: CertificadoDto;

  @ApiProperty({ type: MedidasDto })
  @Expose()
  @Type(() => MedidasDto)
  medidas: MedidasDto;

  @ApiProperty({ type: EnsayosDto })
  @Expose()
  @Type(() => EnsayosDto)
  ensayos: EnsayosDto;

  @ApiProperty({ type: [AnomaliaDto] })
  @Expose()
  @Type(() => AnomaliaDto)
  anomalias: AnomaliaDto[];


  constructor(planillaRevision: PlanillaRevision) {
    this.planilla = new PlanillaDto();
    this.planilla.id = Number(planillaRevision.id);
    this.planilla.numero = planillaRevision.numeroPlanilla;
    this.planilla.fecha = planillaRevision.fecha.toISOString();
    this.planilla.vencimiento = planillaRevision.vencimiento.toISOString();

    // Aquí deberías mapear el resto de los campos anidados (vehiculo, titular, operador, taller, etc.)
    // dependiendo de cómo estén estructurados en tu entidad PlanillaRevision y sus relaciones.
  }
}
