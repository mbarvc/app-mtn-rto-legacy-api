// dtos/planilla-revision-filter.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min, IsDateString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PlanillaRevisionFilterDto {
  @ApiPropertyOptional({ description: 'Página actual', default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  // Siempre ponemos limite para que no explote.
  @ApiPropertyOptional({ description: 'Cantidad de registros', default: 5})
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 5;

  @ApiPropertyOptional({ description: 'Dominio exacto del vehículo' })
  @IsOptional()
  @IsString()
  dominio?: string;

  @ApiPropertyOptional({ description: 'Fecha desde (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  fechaDesde?: string;

  @ApiPropertyOptional({ description: 'Fecha hasta (ISO 8601)' })
  @IsOptional()
  @IsDateString()
  fechaHasta?: string;
}