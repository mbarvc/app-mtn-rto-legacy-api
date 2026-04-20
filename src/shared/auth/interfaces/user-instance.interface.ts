import { IEmpleado } from "./empleado.interface";
import { IEmpresa } from "./empresa.interface";
import { IRole } from "./role.interface";
import { ITipoUsuario } from "./tipo-usuario.interface";

export interface IUserInstanceModel {
    id: number;
    username: string;
    nombre: string;
    apellido: string;
    email: string;
    cuil: string;
    afip: string | null;
    afipLevel: string | null;
    autorizacionPendiente: boolean;
    autorizacionFecha: string | null;
    aplicacionActualId: number | null;
    aplicacionActualNro: number | null;
    activo: boolean;
    bloqueado: boolean;
    datosConfirmados: boolean;
    ultimoLogin: string;
    sub: string;
    tiposUsuario: ITipoUsuario[];
    empresas: IEmpresa[];
    jurisdicciones: any[];
    empleado: IEmpleado[];
    roles: IRole[];
    permisos: string[];
    rolesEmpresa: any[];
    permisosEmpresa: any[];
  }