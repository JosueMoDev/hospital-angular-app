import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';



@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styles: [
  ]
})
export class ChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

doughnutChartLabels1: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
  public data1:ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [ {  data: [ 40, 10, 100 ],
      backgroundColor: ['#00821C','#09DB36','#024D0F'],
      hoverBackgroundColor: ['#00821C','#09DB36','#024D0F'],
      hoverBorderColor:['#000000','#000000','#00000003']
    },
  ]
};
doughnutChartLabels2: string[] = [ 'Pan', 'Refresco', 'Tacos' ];
  public data2:ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels2,
    datasets: [ {  data: [ 40, 10, 100 ],
      backgroundColor: ['#01C','#DB36','#024D0F'],
      hoverBackgroundColor: ['#01ff','#DB3','#0D0f'],
      hoverBorderColor:['#000000','#000000','#00000003']
    },
  ]
};


}
