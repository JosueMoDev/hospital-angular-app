import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartComponent } from './chart/chart.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './options/users/users.component';
import { HospitalsComponent } from './options/hospitals/hospitals.component';
import { DoctorsComponent } from './options/doctors/doctors.component';
import { ShownDoctorComponent } from './options/doctors/shown-doctor/shown-doctor.component';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [

  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    }
  },
  {
    path: 'chart',
    component: ChartComponent,
    data: {
      title: 'Chart'
    }
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: {
      title: 'Progress Bar'
    }
  },
  {
    path: 'settings',
    component: AccountSettingsComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'searching/:query',
    component: SearchComponent,
    data: {
      title: 'Searching'
    }
  },
  {
    path: 'promise',
    component: PromiseComponent,
    data: {
      title: 'Promise'
    }
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: {
      title: 'RXJS'
    }
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    data: {
      title: 'User Profile'
    }
  },

  // main optios
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: {
      title:'Users List'
    }
  },
  {
    path: 'hospitals',
    component:HospitalsComponent,
    data: {
      title:'Hospitals List'
    }
  },
  {
    path: 'doctors',
    component:DoctorsComponent,
    data: {
      title:'Doctors List'
    }
  },
  {
    path: 'doctors/:id',
    component:ShownDoctorComponent,
    data: {
      title:'Doctor'
    }
  }

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutingModule { }
