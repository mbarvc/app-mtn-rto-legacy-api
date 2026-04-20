export interface AnomaliaDto {
  id: string; // BigInt a String
  activa: boolean;
  anomaliaPadreId: string | null;
  codigo: string | null;
  codigoNivel: number | null;
  descripcion: string | null;
  esGrave: boolean | null;
  esModerada: boolean | null;
  esLeve: boolean | null;
  nivel: number | null;
}

//update anomaliadto.. etc