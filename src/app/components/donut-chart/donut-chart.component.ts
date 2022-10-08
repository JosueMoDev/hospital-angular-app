import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent} from 'chart.js';
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input('title') charTitle: String = 'Sin Titulo';

   doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
    @Input('data') doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data:[ 359, 456, 200],
        backgroundColor:['#9E120E', '#FF5800', '#FFB414']
       }
    ]
  };
  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }



}
