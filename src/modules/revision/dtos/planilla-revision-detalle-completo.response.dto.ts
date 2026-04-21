import { PlanillaRevision } from '@/src/model';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class PlanillaRevisionPlanillaDto {
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
  vencimiento?: string;
}

class PlanillaRevisionVehiculoDto {
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

class PlanillaRevisionPersonaDto {
  @ApiProperty({ example: 'Transporte SA' })
  @Expose()
  nombre: string;

  @ApiProperty({ example: '30-12345678-9' })
  @Expose()
  cuit: string;
}

class PlanillaRevisionOperadorDto {
  @ApiProperty({ example: 'Juan Perez' })
  @Expose()
  nombre: string;

  @ApiProperty({ example: '20-87654321-3' })
  @Expose()
  cuit: string;
}

class PlanillaRevisionTallerDto {
  @ApiProperty({ example: 26 })
  @Expose()
  codigo: number;

  @ApiProperty({ example: 'El Trébol de Mendoza S.A.' })
  @Expose()
  nombre: string;
}

class PlanillaRevisionCertificadoDto {
  @ApiProperty({ example: 'V' })
  @Expose()
  serie: string;

  @ApiProperty({ example: 593661 })
  @Expose()
  numero: number;
}

class PlanillaRevisionMedidasDto {
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

class PlanillaRevisionFrenoEjeDto {
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

class PlanillaRevisionFrenosDto {
  @ApiProperty({ type: [PlanillaRevisionFrenoEjeDto] })
  @Expose()
  @Type(() => PlanillaRevisionFrenoEjeDto)
  ejes: PlanillaRevisionFrenoEjeDto[];

  @ApiProperty({ example: 47.71 })
  @Expose()
  eficienciaTotal: number;
}

class PlanillaRevisionFrenoEstacionamientoDto {
  @ApiProperty({ example: 20 })
  @Expose()
  eficiencia: number;
}

class PlanillaRevisionEnsayosDto {
  @ApiProperty({ type: PlanillaRevisionFrenosDto })
  @Expose()
  @Type(() => PlanillaRevisionFrenosDto)
  frenos: PlanillaRevisionFrenosDto;

  @ApiProperty({ type: PlanillaRevisionFrenoEstacionamientoDto })
  @Expose()
  @Type(() => PlanillaRevisionFrenoEstacionamientoDto)
  frenoEstacionamiento: PlanillaRevisionFrenoEstacionamientoDto;
}

class PlanillaRevisionAnomaliaDto {
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
  @ApiProperty({ type: PlanillaRevisionPlanillaDto })
  @Expose()
  @Type(() => PlanillaRevisionPlanillaDto)
  planilla: PlanillaRevisionPlanillaDto;

  @ApiProperty({ type: PlanillaRevisionVehiculoDto })
  @Expose()
  @Type(() => PlanillaRevisionVehiculoDto)
  vehiculo: PlanillaRevisionVehiculoDto;

  @ApiProperty({ type: PlanillaRevisionPersonaDto })
  @Expose()
  @Type(() => PlanillaRevisionPersonaDto)
  titular: PlanillaRevisionPersonaDto;

  @ApiProperty({ type: PlanillaRevisionOperadorDto })
  @Expose()
  @Type(() => PlanillaRevisionOperadorDto)
  operador: PlanillaRevisionOperadorDto;

  @ApiProperty({ type: PlanillaRevisionTallerDto })
  @Expose()
  @Type(() => PlanillaRevisionTallerDto)
  taller: PlanillaRevisionTallerDto;

  @ApiProperty({ example: 'Apto' })
  @Expose()
  resultado: string;

  @ApiProperty({ example: 'Cargas Peligrosas' })
  @Expose()
  tipoUso: string;

  @ApiProperty({ type: PlanillaRevisionCertificadoDto })
  @Expose()
  @Type(() => PlanillaRevisionCertificadoDto)
  certificado: PlanillaRevisionCertificadoDto;

  @ApiProperty({ type: PlanillaRevisionMedidasDto })
  @Expose()
  @Type(() => PlanillaRevisionMedidasDto)
  medidas: PlanillaRevisionMedidasDto;

  @ApiProperty({ type: PlanillaRevisionEnsayosDto })
  @Expose()
  @Type(() => PlanillaRevisionEnsayosDto)
  ensayos: PlanillaRevisionEnsayosDto;

  @ApiProperty({ type: [PlanillaRevisionAnomaliaDto] })
  @Expose()
  @Type(() => PlanillaRevisionAnomaliaDto)
  anomalias: PlanillaRevisionAnomaliaDto[];

  constructor(planillaRevision: PlanillaRevision) {
    this.planilla = new PlanillaRevisionPlanillaDto();
    this.planilla.id = Number(planillaRevision.id);
    this.planilla.numero = planillaRevision.nroPlanilla;
    this.planilla.fecha = planillaRevision.fecha.toISOString();
    this.planilla.vencimiento = planillaRevision.vencimiento?.toISOString();

    this.vehiculo = new PlanillaRevisionVehiculoDto();
    this.vehiculo.dominio = planillaRevision.dominio;
    this.vehiculo.anioModelo = planillaRevision.vehiculo?.anio ?? 0;
    this.vehiculo.tipoVehiculo = planillaRevision.vehiculo?.tipoVehiculo?.codigo ?? '-';
    this.vehiculo.categoria = planillaRevision.vehiculo?.categoriaVehiculo.categoria ?? '-';
    //this.vehiculo.convenio = planillaRevision.vehiculo?.convenio ?? '-';

    //TODO: Aquí deberías mapear el resto de los campos anidados (vehiculo, titular, operador, taller, etc.)
  }
}
