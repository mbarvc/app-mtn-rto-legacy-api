import { IOrganismo } from "./organismo.interface";

  // delegacion.model.ts
  export interface IDelegacion {
    id: number;
    descripcion: string;
    activo: boolean;
    delegado: string;
    organismo: IOrganismo;
  }