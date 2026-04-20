````
src/
├── app.module.ts
├── main.ts
├── prisma/                             # 1. Capa de Base de Datos (Global)
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── common/                             # 2. Utilidades Compartidas
│   ├── filters/                        # (Ej: Manejo de errores globales)
│   └── interceptors/                   # (Ej: Interceptor para transformar BigInt si hace falta)
└── modules/                            # 3. Módulos Agrupados lógicamente
    ├── parametricas/                   # -> Grupo 1: Todas las tablas paramétricas
    │   ├── parametricas.module.ts
    │   ├── controllers/
    │   │   ├── localidades.controller.ts
    │   │   └── paises.controller.ts
    │   ├── services/
    │   │   ├── localidades.service.ts
    │   │   └── paises.service.ts
    │   ├── repositories/               # -> Donde ocurre la magia con Prisma
    │   │   ├── localidades.repository.ts
    │   │   └── paises.repository.ts
    │   └── dto/                        # -> Los contratos de salida limpios
    │       ├── localidad-legacy.dto.ts
    │       └── pais-legacy.dto.ts
    │
    ├── vehiculos/                      # -> Grupo 2: Vehículos, Marcas, Modelos
    │   ├── vehiculos.module.ts
    │   ├── controllers/
    │   ├── services/
    │   ├── repositories/
    │   └── dto/
    │
    └── auditorias/                     # -> Grupo 3: Auditorías, Informes, etc.
        ├── auditorias.module.ts
        └── ...`

````

common (Común / Agnóstico): Contiene código puramente técnico, infraestructural o utilitario. No sabe nada de tu negocio (no sabe qué es un vehículo, un taller o una planilla).
shared (Compartido / Específico del Dominio): Contiene código que se utiliza en múltiples "slices" o módulos de tu aplicación, pero que sí conoce tu negocio o tus reglas internas.



## Actualizar todos los paquetes de NestJS: 

### Instala npm-check-updates globalmente: si no lo tienes instalado: 

```bash
npm install -g npm-check-updates
```

### Para actualizar el archivo package.json con las últimas versiones disponibles de tus dependencias:

```bash
ncu -u
```
