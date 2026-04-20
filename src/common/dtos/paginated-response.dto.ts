import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from './page-meta.dto';

// Usamos <T> a nivel de TypeScript para el tipado estricto en el Service
export class PaginatedResponseDto<T> {
  // Nota: No tipamos `data: T[]` con @ApiProperty aquí porque Swagger no lee genéricos.
  // Lo resolveremos con el decorador personalizado abajo.
  data: T[];

  @ApiProperty({ type: () => PageMetaDto })
  meta: PageMetaDto;
}