import { Doctor } from "../models/doctor.model";

export interface DoctorResponse {
  doctors?: Doctor[] | any[],
  total?: number | any
}
