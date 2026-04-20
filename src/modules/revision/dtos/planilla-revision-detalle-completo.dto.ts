import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class PlanillaRevisionDetalleCompletoResponse {
  @ApiProperty({ example: '100293847' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

}