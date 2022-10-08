import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SideBarService } from '../services/side-bar.service';
declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ],
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');

  constructor(
    private settingsService: SettingsService,
    private sidebarSerive: SideBarService

  ) { }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    customInitFunctions();
    this.sidebarSerive.loadMenuItems();
  }
}
