import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PictureModalService {
  private _shownModal: boolean = false;
  public schema!: string;
  public id!: string;
  public picture?: string;
  public baseUrl = environment.baseUrl;
  public newImgUploaded : EventEmitter<string> = new EventEmitter<string>();

  get shownModal() {
    return this._shownModal;
  }
  closeModal() {
    this._shownModal=false;
  }
  openModal(
    schema: 'users'|'hospitals'|'doctors',
    id: string,
    img?:string
  ): string | any {
      this.schema = schema;
      this.id = id;
      this.picture = img;
      if (this.picture) {
        this.picture =`${this.baseUrl}/upload/${this.schema}/${this.picture}`;
      } else {
        this.picture =`/assets/images/no_img.png`
      }
      this._shownModal = true;
    }
    constructor() { }
}
