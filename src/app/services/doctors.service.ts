import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
const baseUrl: string = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  constructor(
    private http : HttpClient
  ) {}
  public doctor!: Doctor;
  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      },
    }
  }
  setdoctorData(data: Doctor) {
    this.doctor = data;
  }

  ShownDoctorById(id: string) {
    return this.http.get(`${baseUrl}/doctors/${id}`, this.headers).
      pipe(
        map(resp => resp)
      )
  }

  loadDoctorsList(from: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}/doctors?pagination=${from}`, this.headers)
      .pipe(
        delay(50),
        map(
          (resp: any) => {
            const doctors = resp.doctors;
            return {
              total: resp.total,
              doctors
            }
          })
      )
  }

  createNewDoctor(doctor: Doctor) {
    return this.http.post(`${baseUrl}/doctors`, doctor, this.headers)
  }

  updateDoctor(data:Doctor) {

    return this.http.put(`${baseUrl}/doctors/${data.doctor_id}`, data, this.headers)
  }

  deleteDoctor(id: string) {

    return this.http.delete(`${baseUrl}/doctors/${id}`, this.headers)

  }
}
