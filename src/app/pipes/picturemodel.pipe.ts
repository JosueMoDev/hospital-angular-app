import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseUrl: string = environment.baseUrl;
@Pipe({
  name: 'picturemodel'
})
export class PicturemodelPipe implements PipeTransform {

  transform(img: string |any, schema: 'users'|'hospitals'|'doctors'): string {
    if (img) {
       return`${baseUrl}/upload/${schema}/${img}`
    } else {
      return `/assets/images/no_img.png`
    }
  }

}
