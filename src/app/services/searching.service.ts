import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, delay } from 'rxjs';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class SearchingService {

  public baseUrl: string = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }
  private setUsers(resp:any[]): User[]{
    return resp.map(
      user => new User(user.name, user.email, '', user.img, user.google, user.role, user.user_id)
    )
  }
  private setHospital(resp:any[]): Hospital[]{
    return resp.map(
      hospital => new Hospital(hospital.name, hospital.hospital_id, hospital.img, hospital.user)
    )
  }
  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  searchingResponse(schema:string, query:string) {
    return this.http.get<any[]>(`${this.baseUrl}/all/collection/${schema}/${query}`, this.headers)
      .pipe(
        map((queryResp: any): any[] => {
         switch (schema) {
          case 'users':
             return this.setUsers(queryResp.data)
           case 'hospitals':
             return this.setHospital(queryResp.data)
          case 'doctors':
            return this.setUsers(queryResp.data)
          default:
            return[];
         }
        }
        )


    )
  }
  globalSearchingResponse(query: string) {
    console.log(query)
    return this.http.get(`${this.baseUrl}/all/${query}`, this.headers)

  }
}
