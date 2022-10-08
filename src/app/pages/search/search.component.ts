import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchingService } from 'src/app/services/searching.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [

  ]
})
export class SearchComponent implements OnInit {

  public query!: string;

  public users: User[] = [];
  public hospitals: Hospital[] = [];
  public doctors: Doctor[] = [];
  public alert!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchingService:SearchingService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        ({ query }) => {
          this.globalSearch(query)
        }
    )
  }
  globalSearch(query: string) {
    this.searchingService.globalSearchingResponse(query)
      .subscribe(
        (resp: any) => {
          this.users = resp.users;
          this.hospitals = resp.hospitals;
          this.doctors = resp.doctors;

          this.alert = this.users.length + this.hospitals.length + this.doctors.length
        }

      )
  }

}
