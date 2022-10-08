import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from "ng2-charts";

import { CounterComponent } from './counter/counter.component';
import { FormsModule } from '@angular/forms';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { PictureModalComponent } from './picture-modal/picture-modal.component';




@NgModule({
  declarations: [
    CounterComponent,
    DonutChartComponent,
    PictureModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [
    CounterComponent,
    DonutChartComponent,
    PictureModalComponent
  ]
})
export class ComponentsModule { }
