import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartComponent } from './chart/chart.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './options/users/users.component';
import { HospitalsComponent } from './options/hospitals/hospitals.component';
import { DoctorsComponent } from './options/doctors/doctors.component';
import { ShownDoctorComponent } from './options/doctors/shown-doctor/shown-doctor.component';
import { SearchComponent } from './search/search.component';







@NgModule({
  declarations: [
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    AccountSettingsComponent,
    PromiseComponent,
    RxjsComponent,
    UserProfileComponent,
    UsersComponent,
    HospitalsComponent,
    DoctorsComponent,
    ShownDoctorComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule,
    SharedModule,
    ComponentsModule,
    PipesModule


  ],
  exports:[
    ChartComponent,
    DashboardComponent,
    PagesComponent,
    ProgressComponent,
    UsersComponent

  ]
})
export class PagesModule { }
