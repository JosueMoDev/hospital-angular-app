import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent  {

  @Input('progress-value') progress: number = 95;
  @Input('classCostume') btnClass: string = 'btn btn-primary';

  @Output() OutputValue: EventEmitter<number> = new EventEmitter;
  changeValue(value: number): any{

    if (this.progress >= 100 && value >= 0) {
      this.OutputValue.emit(100);
      return this.progress = 100;
    }
    if (this.progress <= 0 && value < 0 ) {
      this.OutputValue.emit(0);
      return this.progress = 0;

    }

    this.progress = this.progress + value;
    this.OutputValue.emit(this.progress);
  }

  onChanges(value: number) {
    if (value >= 100) {
      this.progress = 100;
    } else if ( value <= 0) {
      this.progress= 0
    } else {
      this.progress = value;
    }
    this.OutputValue.emit(this.progress);
  }

}
