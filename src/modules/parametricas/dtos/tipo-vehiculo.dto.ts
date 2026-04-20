import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';

// 1. DTO de Salida (Contrato de lectura)
export class TipoVehiculoDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'MOTO' })
  abreviatura: string;

  @ApiProperty({ example: '01' })
  codigo: string;

  @ApiProperty({ example: 'Motocicleta' })
  tipo: string;

  @ApiProperty({ example: true, required: false })
  motorizado: boolean | null;

  @ApiProperty({ required: false })
  codigoVehTpo: string | null;

  @ApiProperty({ required: false })
  codigoVehTpoOtr: string | null;

  @ApiProperty({ example: true })
  activo: boolean;
}

// 2. DTO de Creación
export class CreateTipoVehiculoDto {
  @ApiProperty({ example: 'MOTO' })
  @IsString()
  @IsNotEmpty()
  abreviatura: string;

  @ApiProperty({ example: '01' })
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Motocicleta' })
  @IsString()
  @IsNotEmpty()
  tipo: string;

  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @IsOptional()
  motorizado?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  codigoVehTpo?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  codigoVehTpoOtr?: string;
}

// 3. DTO de Actualización
export class UpdateTipoVehiculoDto extends PartialType(CreateTipoVehiculoDto) {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}