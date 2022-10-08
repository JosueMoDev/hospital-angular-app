import {  Component, OnInit, ViewChild, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { SideBarService } from '../../services/side-bar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('googleButton') googleButton: any;

  public formSubmitted: boolean = false;


  public loginForm: FormGroup = this.formbuilder.group({
    email: [localStorage.getItem('email')||'', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember:[(localStorage.getItem('email'))?true:false]
  });

  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private dologin: UserService,
    private sidebarsService: SideBarService
  ) { }


  ngOnInit(): void {

  }

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.dologin.userLogin(this.loginForm.value)
      .subscribe(
        resp => {
          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value)
          } else {
            localStorage.removeItem('email');
          }

          this.sidebarsService.menu
          this.router.navigateByUrl('/');
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
    if (this.loginForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
     }
  }

}
