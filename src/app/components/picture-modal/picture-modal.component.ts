import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { PictureModalService } from 'src/app/services/picture-modal.service';
import { UserService } from '../../services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-picture-modal',
  templateUrl: './picture-modal.component.html',
  styleUrls: ['./picture-modal.component.css']
})
export class PictureModalComponent implements OnInit {

  public imgUpload: File | any;
  public imgTemp: any = null;
  public user!: User;



  constructor(
    public pictureModal: PictureModalService,
    private fileUploadService: FileUploadService,
    private userService: UserService

  ) {
    this.user = this.userService.user;
    }

    ngOnInit(): void {
  }

  hiddenModal() {
    this.imgTemp = null;
    this.pictureModal.closeModal()
  }

  uploadPicture(event: File| any ): File | any  {
    const file = event.files[0];
    this.imgUpload = file!;
    if ( !file ) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  updatePicture() {

    this.fileUploadService
      .updatePicture( this.imgUpload!, this.pictureModal.schema, this.pictureModal.id )
      .then(img => {
        if (this.user.user_id === this.pictureModal.id) {
          this.user.img= img;
        }
        if (img) {
          Swal.fire({
            title: 'Sueccess',
            text: ` ${this.pictureModal.schema}pricture has updated success`,
            timer: 2000,
            icon:'success'
          });
          this.pictureModal.newImgUploaded.emit(img)
        } else {

          Swal.fire('Upss!', 'Kind of file is not allowed', 'warning');
        }
        }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'We couldnt upload your profile pricture', 'error');
      })

  }



}
