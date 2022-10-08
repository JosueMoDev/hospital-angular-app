
interface _HospitalUser {
  _id: string,
  name: string,
  img?: string
}
export interface HospitalInterface{
  ok: boolean,
  hospitals: Hospital[],
}

export class Hospital {
  constructor(
    public name: string,
    public hospital_id?: string,
    public img?: string,
    public user?: _HospitalUser

  ) { }
}
