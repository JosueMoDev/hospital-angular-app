import { Hospital } from './hospital.model';

interface _UserInDoctor {
  _id?: string,
  name?: string,
  img?: string
}
interface _HospitalInDoctor {
  _id?: string,
  name?: string,
  img?: string
}

export class Doctor {
  constructor(
    public name: string,
    public doctor_id?: string,
    public img?: string,
    public user?: _UserInDoctor,
    public hospital?: Hospital

  ) { }
}
export interface DoctorInterface{
  ok: boolean,
  message: string,
  doctors: Doctor[],
  total?: number
}
