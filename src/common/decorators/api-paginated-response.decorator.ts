import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../dtos/paginated-response.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    // Le decimos a Swagger que cargue tanto el wrapper como el modelo específico
    ApiExtraModels(PaginatedResponseDto, model),
    ApiOkResponse({
      description: 'Lista paginada retornada exitosamente.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) }, // Inyectamos el tipo T dinámicamente
              },
            },
          },
        ],
      },
    }),
  );
};