import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay, map, Observable } from 'rxjs';
import { Hospital, HospitalInterface } from '../models/hospital.model';

const baseUrl: string = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor(
    private http : HttpClient
  ) { }

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
  loadHospitalList():Observable<Hospital[]> {
    return this.http.get <HospitalInterface>(`${baseUrl}/hospitals/`, this.headers)
      .pipe(
        delay(100),
        map((resp) => resp.hospitals )
      );
  }
  createNewHospital( name: string) {
    return this.http.post(`${baseUrl}/hospitals`, {name}, this.headers)
  }

  updateHospital(id: string, name: string) {
    console.log('id', id , 'name',name)
    return this.http.put(`${baseUrl}/hospitals/${id}`, {name}, this.headers)
  }

  deleteHospital(id: string) {
    return this.http.delete(`${baseUrl}/hospitals/${id}`, this.headers)

  }

}
