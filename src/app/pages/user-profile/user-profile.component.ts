
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
  ]
})
export class UserProfileComponent implements OnInit {


  public profileForm!: FormGroup;
  public user!: User;
  public imgUpload: File | any;
  public imgTemp: any = null;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    this.profileForm = this.formbuilder.group({
      name: [ this.user.name , Validators.required ],
      email: [ this.user.email, [ Validators.required, Validators.email ] ],
    });

  }

  updateProfile() {
    this.userService.updateUserProfile( this.profileForm.value )
      .subscribe(() => {
          console.log(this.profileForm.value)
          const { name, email } = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;

          Swal.fire('Success', 'User has been updated', 'success');
        }, (err:any) => {
          Swal.fire('Error', err.error.message, 'error');
        });
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
      .updatePicture( this.imgUpload!, 'users', this.user.user_id! )
      .then(img => {
        this.user.img = img;
        if (img) {
          Swal.fire('Sueccess', 'Your profile pricture has updated success', 'success');
        } else {

          Swal.fire('Upss!', 'Kind of file is not allowed', 'warning');
        }
        }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'We couldnt upload your profile pricture', 'error');
      })

  }

}
