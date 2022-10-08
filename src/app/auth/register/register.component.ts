import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formSubmitted:boolean = false;

  public registerForm: FormGroup = this.formbuider.group({
    name: ['Jonas', Validators.required],
    email: ['jonastest@mail.com', Validators.required],
    password: ['123456', Validators.required],
    passwordConfirm: ['123456', Validators.required],
    termAndCond:[true, Validators.required]
  }, {Validators: this.validatePasswords('password', 'passwordConfirm')});

  constructor(
    private formbuider: FormBuilder,
    private newUser: UserService,
    private router: Router,
  ) { }

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    // send data
    this.newUser.createANewUser(this.registerForm.value)
      .subscribe(
        resp => {

          Swal.fire(
            {
              title: 'Success',
              text: `User has created success`,
              icon:'success'
            }
          ),
          this.router.navigateByUrl('/login')
          },
        (err) => {
          Swal.fire(
            {
              title: 'Error',
              text: err.error.message,
              icon: 'error'

            }
          )
        },
      );

  }
  thereIsAnInvalidField( field : string):boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
     }
  }
  termsAndConditions() {
    return !this.registerForm.get('termAndCond')?.value && this.formSubmitted
  }
  passwordsNotEquals() {
    const password = this.registerForm.get('password')?.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')?.value;

    if ((password !== passwordConfirm) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  validatePasswords(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const passwordField = formGroup.get(password);
      const passwordConfirmField = formGroup.get(passwordConfirm);
      if ( passwordField === passwordConfirmField) {
          passwordConfirmField?.setErrors(null)
      } else {
        passwordConfirmField?.setErrors({passwordsNotEquals: true})
      }

    }

  }


}
