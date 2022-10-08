import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchingService } from '../../../services/searching.service';
import Swal from 'sweetalert2';
import { PictureModalService } from '../../../services/picture-modal.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [`.pointer{ cursor:pointer}`
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public userList: User[] = [];
  public dataTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public pictureSubscription!: Subscription;
  constructor(
    private userService: UserService,
    private searchingService: SearchingService,
    public pictureModal: PictureModalService
  ) {

  }

  ngOnInit(): void {
    this.renderUsers()
    this.pictureSubscription = this.pictureModal.newImgUploaded
      .pipe(delay(500))
      .subscribe(
        img => {
          this.renderUsers();
          })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.pictureSubscription.unsubscribe();

  }
  renderUsers() {
    this.loading = true;
    this.userService.loadUsersList(this.from)
      .subscribe(
        ({ users, total }) => {
          this.userList = users;
          this.dataTemp = users;
          this.totalUsers = total;
          this.loading = false
        }
      )
  }
  userPagination( from: number) {
    this.from += from;
    if (this.from < 0) {
      this.from = 0
    } else if (this.from >=this.totalUsers ) {
      this.from-=from
    }
    this.renderUsers()
  }

  search(query: string):any {
    if (query.length===0) {
      return this.userList = this.dataTemp
    }
    this.searchingService.searchingResponse('users', query)
      .subscribe(queryRespo => this.userList= queryRespo);
  }

  deleteUser(user: User) {
    if (user.user_id === this.userService.user_id) {
      Swal.fire({
        title: 'Error',
        text: `Your'nt able to delete yourself`,
        icon: 'error'
      })
      return;
    }
      Swal.fire({
        title: 'Do you want to delete user?',
        text: `Your next to delete to ${user.name}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'delete'
      }).then((result) => {
        if (result.value) {

          this.userService.deleteUserConfirmation(user.user_id!)
            .subscribe(resp => {
              Swal.fire({
                title: 'User has been deleted',
                text: `${user.name} has been deleted success`,
                icon: 'success'

              })
              this.renderUsers();
            });

        }
    })
  }

  updateUserRole(user:User) {
    this.userService.updateUserProfile(user)
        .subscribe( () => {
          Swal.fire('Success', 'User has been updated', 'success');
        }, (err:any) => {
          Swal.fire('Error', err.error.message, 'error');
        });
  }

  shownModal(user: User) {
    this.pictureModal.openModal('users', user.user_id!, user.img)
  }
}
