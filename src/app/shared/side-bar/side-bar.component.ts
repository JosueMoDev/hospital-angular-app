import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SideBarService } from 'src/app/services/side-bar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
  ]
})
export class SideBarComponent implements OnInit {
  menuItems: any[] = [];
  public data: User;
  constructor(
    private sidebarService: SideBarService,
    private userService: UserService
  ) {
    this.data = userService.user
  }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.menu;
  }

}
