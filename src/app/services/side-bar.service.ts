import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideBarService {
  public menu = [];
  loadMenuItems() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '');
  }
  constructor() {
    this.loadMenuItems()
  }


}
