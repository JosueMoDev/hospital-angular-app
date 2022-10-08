import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseUrl
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(

  ) { }

  async updatePicture(
    Picture: File,
    schema: string,
    file: string
  ) {

    try {

      const url = `${ baseUrl }/upload/${ schema }/${ file }`;
      const formData = new FormData();
      formData.append('img', Picture);
      //TODO: hacer por medio de Http Client
      // const resp =  this.http.post(url, {  headers: {
      // 'x-token': localStorage.getItem('token') || ''
      // },
      // body: formData
      // })
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if (data.ok) {
        return data.file;
      } else {

        return false;
      }

    } catch (error) {
      return false;
    }

  }

}
