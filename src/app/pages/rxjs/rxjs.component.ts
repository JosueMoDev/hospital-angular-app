import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

 public  interbalSubs: Subscription;

  constructor() {
    // const obs$ = new Observable(observer => {
    //   let i = 0;
    //   const interval =  setInterval(() => {
    //   i++;

    //   observer.next(i);

    //   if (i === 4) {
    //     clearInterval(interval);
    //     observer.complete();
    //   }
    //     if (i === 2) {
    //       // i = 0;
    //       observer.error('something happend')
    //     }
    // }, 1000)
    // });

    // obs$
    //   .pipe(
    //     retry(1)
    //   )
    //   .subscribe(
    //   value => console.log('sub:', value),
    //   error => console.warn('Error:', error),
    //   () => console.info('We have alredy done')

    // );
    this.interbalSubs = this.returnInterval().subscribe(
      console.log
    );

  }
  returnInterval(): Observable<number> {
    return interval(1000)
      .pipe(
        map( value => value +1),
        take(2),
        filter(value => (value%2===0) ?true : false),
      );
  }
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.interbalSubs.unsubscribe();
  }


}
