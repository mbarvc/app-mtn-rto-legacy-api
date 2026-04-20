// dtos/planilla-revision-response.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { TipoUsoDto } from './tipo-uso.dto';
import { CertificadoDto } from './certificado.dto';

export class PlanillaRevisionResponseDto {
  @ApiProperty({ example: '100293847' })
  @Expose()
  @Transform(({ value }) => value?.toString())
  id: string;

  @ApiProperty()
  @Expose()
  dominio: string;

  @ApiProperty()
  @Expose()
  fecha: Date;

  @ApiProperty()
  @Expose({ name: 'vehiculo_validado' })
  vehiculoValidado: boolean;

  @ApiProperty({ name: 'codTaller' })
  @Expose({ name: 'cod_taller' }) 
  codTaller: number;

  @ApiProperty({ name: 'resultadoId' })
  @Expose({ name: 'resultado_id' }) // <--- mapeo propiedad SQL a la clase
  @Transform(({ value }) => value?.toString())
  resultadoId: string; // Asumiendo que quieres el ID o la relación anidada más adelante



  @ApiProperty({name: 'vencimiento'})
  @Expose({name: 'vencimiento'})
  vencimiento: Date;

  @ApiProperty()
  @Expose({name:'nro_planilla'})
  nroPlanilla: number;

  @ApiProperty({ name: 'tipoUsoId' })
  @Expose({ name: 'tipo_uso_id' })
  @Transform(({ value }) => value?.toString())
  tipoUsoId: string;

  @ApiPropertyOptional({ name: 'certificadoId' })
  @Expose({ name: 'certificado_id' })
  @Transform(({ value }) => value?.toString())
  certificadoId: string;

  // Relaciones --------
  @ApiProperty({ name: 'resultado' })
  @Expose({ name: 'resultado' })
  @Transform(({ obj }) => obj.resultado?.texto)
  resultado: string;
  
  @ApiProperty({ name: 'tipoUso' })
  @Expose({ name: 'tipo_uso' })
  @Type(() => TipoUsoDto)
  tipoUso: TipoUsoDto;
  
  @ApiProperty({ name: 'certificado' })
  @Expose({ name: 'certificado_planilla_revision_certificado_idTocertificado' })
  @Type(() => CertificadoDto)
  certificado: CertificadoDto;

}