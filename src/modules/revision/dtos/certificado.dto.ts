import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class CertificadoDto {
     @ApiProperty({ example: '100293847' })
     @Expose()
     @Transform(({ value }) => value?.toString())
     id: string;
     
     @ApiProperty()
     @Expose()
     serie: string;
     
     @ApiProperty()
     @Expose()
     numero: number;
    
}