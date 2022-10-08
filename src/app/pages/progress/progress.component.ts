import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progressbarA: number = 25;
  progressbarB: number = 35;


  get getProgressBarA(): any {
    return `${this.progressbarA}%`;
  }

  get getProgressBarB(): any {
    return `${this.progressbarB}%`;
  }

}
