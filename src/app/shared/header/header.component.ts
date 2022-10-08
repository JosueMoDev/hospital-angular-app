import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`.cursor{
    cursor:pointer;
  }`
  ]
})
export class HeaderComponent implements OnInit {
  public profilPicture: any;
  public data: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.data = userService.user

  }

  ngOnInit(): void {


  }

  logout() {
    this.userService.logout();
  }

  searching(query: string) {
    if (query.trim().length !== 0) {
      this.router.navigateByUrl(`/dashboard/searching/${query}`)
    }
    return;
  }
  close() {
    this.router.navigateByUrl(`/dashboard`)
  }

}
