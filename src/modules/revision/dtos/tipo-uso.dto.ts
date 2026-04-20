import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";

export class TipoUsoDto {
    @ApiProperty({ example: '100293847' })
    @Expose()
    @Transform(({ value }) => value?.toString())
    id: string;
    
    @ApiProperty()
    @Expose()
    codigo: string;

    @ApiProperty()
    @Expose()
    abreviatura: string;
}