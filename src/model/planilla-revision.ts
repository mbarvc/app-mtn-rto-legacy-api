import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform, Type } from 'class-transformer';
import { TipoUso } from './tipo-uso';
import { Certificado } from './certificado';


export class PlanillaRevision {
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
  numeroPlanilla: number;

  @ApiProperty({ name: 'tipoUsoId' })
  @Expose({ name: 'tipo_uso_id' })
  @Transform(({ value }) => value?.toString())
  tipoUsoId: string;

    @ApiPropertyOptional({
    description: 'ID del cerificado asociado a la planilla de revisión',
    example: 3,
  })
  @Transform(({ obj }) => obj.certificadoId ?? obj.certificado_id)
  @Expose()
  certificadoId?: bigint;


  // Relaciones --------
  @ApiProperty({ name: 'resultado' })
  @Expose({ name: 'resultado' })
  @Transform(({ obj }) => obj.resultado?.texto)
  resultado: string;
  
  @ApiProperty({ name: 'tipoUso' })
  @Expose({ name: 'tipo_uso' })
  @Type(() => TipoUso)
  tipoUso: TipoUso;
  
@ApiPropertyOptional({
description: 'Información del certificado asociado a la planilla de revisión',
type: () => Certificado,
})
@Transform(({ obj, options }) => {
const raw = obj.Certificado ?? obj.tipo_carroceria;
if (!raw) return null;
return plainToInstance(Certificado, raw, {
excludeExtraneousValues: options.excludeExtraneousValues,
});
})
@Expose()
certificado?: Certificado;

}