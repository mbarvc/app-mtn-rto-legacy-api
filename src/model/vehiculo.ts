import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, plainToInstance, Transform, Type } from "class-transformer";
import { TipoVehiculo } from "./tipo-vehiculo";
import { Localidad } from "./localidad";
import { ModeloMotor } from "./modelo-motor";
import { ModeloChasis } from "./modelo-chasis";
import { TipoCajaVelocidad } from "./tipo-caja-velocidad";
import { ConfiguracionEjes } from "./configuracion-ejes";
import { TipoCarroceria } from "./tipo-carroceria";
import { CategoriaVehiculo } from "./categoria-vehiculo";


export class Vehiculo {
  @ApiProperty({
    description: 'Identificador único del vehículo',
    example: 1001,
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
    description: 'Año de fabricación del vehículo',
    example: 2020,
  })
  @Expose()
  anio!: number;

  @ApiProperty({
    description: 'Dominio (patente) del vehículo',
    example: 'AB123CD',
  })
  @Expose()
  dominio!: string;

  @ApiProperty({
    description: 'Número de chasis del vehículo',
    example: '9BM384075HB548972',
  })
  @Transform(({ obj }) => obj.nroChasis ?? obj.nro_chasis)
  @Expose()
  nroChasis!: string;

  @ApiPropertyOptional({
    description: 'Número de motor del vehículo',
    example: '366094U0819265',
  })
  @Transform(({ obj }) => obj.nroMotor ?? obj.nro_motor)
  @Expose()
  nroMotor?: string;

  @ApiProperty({ description: 'Peso bruto total en kg', example: 18000 })
  @Transform(({ obj }) => obj.pesoBrutoTotal ?? obj.peso_bruto_total)
  @Expose()
  pesoBrutoTotal!: number;

  @ApiPropertyOptional({
    description: 'Potencia del motor en HP',
    example: 280,
  })
  @Expose()
  potenciaMotor?: number;

  @ApiPropertyOptional({
    description: 'ID del tipo de caja de velocidad',
    example: 1,
  })
  @Transform(({ obj }) => obj.tipoCajaVelocidadId ?? obj.tipo_caja_velocidad_id)
  @Expose()
  tipoCajaVelocidadId?: bigint;

  @ApiPropertyOptional({
    description: 'ID del tipo de carrocería',
    example: 3,
  })
  @Transform(({ obj }) => obj.tipoCarroceriaId ?? obj.tipo_carroceria_id)
  @Expose()
  tipoCarroceriaId?: bigint;

  @ApiPropertyOptional({
    description: 'Indica si el vehículo está activo',
    example: true,
  })
  activo?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el vehículo es de configuración súper ancha',
    example: false,
  })
  superAncha?: boolean;

  @ApiPropertyOptional({
    description: 'Número de vehículo mellizo (gemelo)',
    example: 1,
  })
  numeroMellizo?: number;

  @ApiPropertyOptional({
    description: 'Indica si el vehículo posee limitador de velocidad',
    example: true,
  })
  poseeLimitador?: boolean;

  @ApiPropertyOptional({
    description: 'Indica si el vehículo posee tacógrafo',
    example: true,
  })
  poseeTacografo?: boolean;

  @ApiProperty({
    description: 'Tipo de vehículo',
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
  tipoVehiculo: TipoVehiculo;


  @ApiProperty({
    description: 'Categoría del vehículo',
    type: () => CategoriaVehiculo,
  })
  @Type(() => CategoriaVehiculo)
  @Transform(({ obj, options }) => {
    const raw = obj.categoriaVehiculo ?? obj.categoria_vehiculo;
    if (!raw) return null;
    return plainToInstance(CategoriaVehiculo, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  categoriaVehiculo!: CategoriaVehiculo;

  @ApiProperty({
    description: 'Localidad de radicación del vehículo',
    type: () => Localidad,
  })
  @Transform(({ obj, options }) => {
    const raw = obj.localidadRadicacion ?? obj.localidad;
    if (!raw) return null;
    return plainToInstance(Localidad, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  localidadRadicacion: Localidad;

  @ApiPropertyOptional({
    description: 'Modelo de motor del vehículo',
    type: () => ModeloMotor,
  })
  @Transform(({ obj, options }) => {
    const raw = obj.modeloMotor ?? obj.modelo_motor;
    if (!raw) return null;
    return plainToInstance(ModeloMotor, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  modeloMotor?: ModeloMotor;

  @ApiProperty({
    description: 'Modelo de chasis del vehículo',
    type: () => ModeloChasis,
  })
  @Transform(({ obj, options }) => {
    const raw = obj.modeloChasis ?? obj.modelo_chasis;
    if (!raw) return null;
    return plainToInstance(ModeloChasis, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  modeloChasis!: ModeloChasis;

  @ApiPropertyOptional({
    description: 'Tipo de caja de velocidad del vehículo',
    type: () => TipoCajaVelocidad,
  })
  @Type(() => TipoCajaVelocidad)
  @Transform(({ obj, options }) => {
    const raw = obj.tipoCajaVelocidad ?? obj.tipo_caja_velocidad;
    if (!raw) return null;
    return plainToInstance(TipoCajaVelocidad, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  tipoCajaVelocidad?: TipoCajaVelocidad;

  @ApiPropertyOptional({
    description: 'ID de la configuración de ejes (tipo de tren)',
    example: 2,
  })
  @Transform(({ obj }) => obj.tipoDeTrenId ?? obj.tipo_de_tren_id)
  @Expose()
  tipoDeTrenId?: bigint;

  @ApiPropertyOptional({
    description: 'Configuración de ejes del vehículo',
    type: () => ConfiguracionEjes,
  })
  @Type(() => ConfiguracionEjes)
  @Transform(({ obj, options }) => {
    const raw =
      obj.tipoDeTren ??
      obj.configuracionEjes ??
      obj.configuracion_ejes ??
      obj.tipo_de_tren;
    if (!raw) return null;
    return plainToInstance(ConfiguracionEjes, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  configuracionEjes?: ConfiguracionEjes;

  @ApiPropertyOptional({
    description: 'Tipo de carrocería del vehículo',
    type: () => TipoCarroceria,
  })
  @Transform(({ obj, options }) => {
    const raw = obj.tipoCarroceria ?? obj.tipo_carroceria;
    if (!raw) return null;
    return plainToInstance(TipoCarroceria, raw, {
      excludeExtraneousValues: options.excludeExtraneousValues,
    });
  })
  @Expose()
  tipoCarroceria?: TipoCarroceria;
}