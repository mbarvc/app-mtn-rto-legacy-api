import { IDelegacion } from "./delegacion.interface";
import { IOrganismo } from "./organismo.interface";

  // empleado.model.ts
  export interface IEmpleado {
    id: number;
    legajo: number;
    organismo: IOrganismo;
    delegacion: IDelegacion;
    usuarioGDE: string;
    ucp: any;
  }