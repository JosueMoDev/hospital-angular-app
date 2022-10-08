import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title: string = '';
  public titleSub$: Subscription;

  constructor(private router: Router) {
    this.titleSub$ = this.getBreadCrumbsTitle()
      .subscribe(({ title}) => { this.title = title}
  );;

  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getBreadCrumbsTitle() {
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      );

  }

  ngOnInit(): void {
  }

}
