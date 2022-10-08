import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';

// import { ShownDoctorComponent } from './options/doctors/shown-doctor/shown-doctor.component';




const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad:[AuthGuard],
    loadChildren:()=> import('./child-routing.module').then(m => m.ChildRoutingModule )
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
