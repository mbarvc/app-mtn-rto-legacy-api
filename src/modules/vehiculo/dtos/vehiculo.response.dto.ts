import { Vehiculo } from '@/src/model';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

// ─────────────────────────────────────────
// Radicacion
// ─────────────────────────────────────────
export class RadicacionDto {
  @Expose()
  @ApiProperty({
    description: 'País de radicación del vehículo',
    example: 'Argentina',
  })
  pais: string = '';

  @Expose()
  @ApiProperty({
    description: 'Provincia de radicación',
    example: 'Corrientes',
  })
  provincia: string = '';

  @Expose()
  @ApiProperty({
    description: 'Localidad de radicación',
    example: 'Corrientes Capital',
  })
  localidad: string = '';
}

// ─────────────────────────────────────────
// Vehiculo (datos generales)
// ─────────────────────────────────────────
export class VehiculoDetalleDto {
  @Expose()
  @ApiProperty({ description: 'Tipo de vehículo', example: 'Camioneta' })
  tipoVehiculo: string = '';

  @Expose()
  @ApiProperty({
    description: 'Año de fabricación del vehículo',
    example: 2014,
  })
  anio: number = 0;

  @Expose()
  @ApiProperty({
    description: 'Datos de radicación del vehículo',
    type: () => RadicacionDto,
  })
  @Type(() => RadicacionDto)
  radicacion: RadicacionDto = new RadicacionDto();
}

// ─────────────────────────────────────────
// Motor
// ─────────────────────────────────────────
export class MotorDto {
  @Expose()
  @ApiProperty({
    description: 'Tipo de combustible del motor',
    example: 'Nafta',
  })
  tipoCombustible: string = '';

  @Expose()
  @ApiProperty({ description: 'Marca del motor', example: 'FORD' })
  marcaMotor: string = '';

  @Expose()
  @ApiProperty({ description: 'Tipo de caja de velocidad', example: 'Manual' })
  tipoCajaVelocidad: string = '';

  @Expose()
  @ApiProperty({ description: 'Número de motor', example: 'A0JBE8905215' })
  nroMotor: string = '';
}

// ─────────────────────────────────────────
// Chasis
// ─────────────────────────────────────────
export class ChasisDto {
  @Expose()
  @ApiProperty({ description: 'Marca del chasis', example: 'FORD' })
  marcaChasis: string = '';

  @Expose()
  @ApiProperty({ description: 'Modelo del chasis', example: 'ECOSPORT' })
  modeloChasis: string = '';

  @Expose()
  @ApiProperty({
    description: 'Número de chasis (VIN)',
    example: '9BFZB65F8E8905215',
  })
  numero: string = '';

  @Expose()
  @ApiProperty({
    description: 'Tipo de tren (configuración de ejes)',
    example: '1-S',
  })
  tipoTren: string = '';

  @Expose()
  @ApiProperty({ description: 'Tipo de caja', example: 'TCCE' })
  tipoCaja: string = '';

  @Expose()
  @ApiProperty({ description: 'Peso bruto total en kg', example: 2000 })
  pesoBrutoTotal: number = 0;
}

// ─────────────────────────────────────────
// Dto principal
// ─────────────────────────────────────────
export class VehiculoDto {
  @Expose()
  @ApiProperty({
    description: 'Dominio (patente) del vehículo',
    example: 'AB123CD',
  })
  dominio: string = '';

  @Expose()
  @ApiProperty({
    description: 'Datos generales del vehículo',
    type: () => VehiculoDetalleDto,
  })
  @Type(() => VehiculoDetalleDto)
  vehiculo: VehiculoDetalleDto = new VehiculoDetalleDto();

  @Expose()
  @ApiProperty({ description: 'Datos del motor', type: () => MotorDto })
  @Type(() => MotorDto)
  motor: MotorDto = new MotorDto();

  @Expose()
  @ApiProperty({ description: 'Datos del chasis', type: () => ChasisDto })
  @Type(() => ChasisDto)
  chasis: ChasisDto = new ChasisDto();

  constructor(vehiculo: Vehiculo) {
    this.dominio = vehiculo.dominio ?? '';

    this.vehiculo = new VehiculoDetalleDto();
    this.vehiculo.tipoVehiculo = vehiculo.tipoVehiculo?.tipo ?? '';
    this.vehiculo.anio = vehiculo.anio ?? 0;
    this.vehiculo.radicacion = new RadicacionDto();
    this.vehiculo.radicacion.pais =
      vehiculo.localidadRadicacion?.provincia?.pais?.nombre ?? '';
    this.vehiculo.radicacion.provincia =
      vehiculo.localidadRadicacion?.provincia?.nombre ?? '';
    this.vehiculo.radicacion.localidad =
      vehiculo.localidadRadicacion?.nombre ?? '';

    this.motor = new MotorDto();
    this.motor.tipoCombustible =
      vehiculo.modeloMotor?.tipoCombustible?.tipo ?? '';
    this.motor.marcaMotor = vehiculo.modeloMotor?.marcaMotor?.marca ?? '';
    this.motor.tipoCajaVelocidad = vehiculo.tipoCajaVelocidad?.tipo ?? '';
    this.motor.nroMotor = vehiculo.nroMotor ?? '';

    this.chasis = new ChasisDto();
    this.chasis.marcaChasis = vehiculo.modeloChasis?.marcaChasis?.marca ?? '';
    this.chasis.modeloChasis = vehiculo.modeloChasis?.modelo ?? '';
    this.chasis.numero = vehiculo.nroChasis ?? '';
    this.chasis.tipoTren = vehiculo.configuracionEjes?.configuracion ?? '';
    this.chasis.tipoCaja = vehiculo.tipoCarroceria?.codigo ?? '';
    this.chasis.pesoBrutoTotal = vehiculo.pesoBrutoTotal ?? 0;
  }
}
