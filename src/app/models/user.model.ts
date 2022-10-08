
import { environment } from "src/environments/environment"

export class User {
  public baseUrl = environment.baseUrl;
  constructor(

    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'USER_ROLE'|'ADMIN_ROLE',
    public user_id?: string,

  ) { }

  get userImagenProfil() {

    if (!this.img) {
      return `/assets/images/no_img.png`
     }
    else if (this.img) {
      return `${this.baseUrl}/upload/users/${this.img}`
    } else {
      return `/assets/images/no_img.png`

    }
  }
}
