import { ITipoUsuario } from "./tipo-usuario.interface";
import { IUserInstanceModel } from "./user-instance.interface";

export class Payload {
    
    afip : boolean;
    afipLevel : number | null;
    at_hash : string;
    aud : string[];
    auth_time :number;
    cuil : string;
    email : string;
    exp : number;
    family_name : string;
    given_name : string;
    iat : number;
    id : number;
    iss : string;
    jti : string;
    nonce : string;
    proveedor : string;
    rat : number;
    sub : string;
    tiposUsuario : ITipoUsuario[];
    userInstance? : IUserInstanceModel  
}