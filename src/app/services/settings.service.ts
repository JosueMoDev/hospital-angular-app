import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  private links!: NodeListOf<Element>;

  constructor() {
    const url:string = localStorage.getItem('theme')||'./assets/css/colors/default-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url: string = `./assets/css/colors/${theme}.css`;

    this. linkTheme?.setAttribute('href', url);

    localStorage.setItem('theme', url);

    this.checkingCurrentTheme();
  }
  checkingCurrentTheme() {
    this.links = document.querySelectorAll('.selector');
    this.links.forEach(element => {
      element.classList.remove('working');

      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working')
      }

    })
  }
}
