import {Component, OnDestroy} from '@angular/core';
import {LoaderService} from './services/loader.service';
import {Subscription} from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  template: '<app-loader *ngIf="showLoader"></app-loader><router-outlet></router-outlet> ',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  showLoader = false;
  private subscription: Subscription;

  constructor(ls: LoaderService, private router: Router) {
    this.showLoader = ls.showLoader;
    this.subscription = ls.shouldShowLoader.subscribe((value) => {
      this.showLoader = value;
    });

    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }


  ngOnDestroy() {
    // prevent memory leak when application is destroyed
    this.subscription.unsubscribe();
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.showLoader = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.showLoader = false;
    }
  }
}
