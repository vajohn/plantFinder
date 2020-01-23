import {Component} from '@angular/core';
import {LoaderService} from './services/loader.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<app-loader *ngIf="showLoader"></app-loader><router-outlet></router-outlet> ',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLoader = false;
  private subscription: Subscription;

  constructor(ls: LoaderService) {
    this.showLoader = ls.showLoader;
    this.subscription = ls.shouldShowLoader.subscribe((value) => {
      this.showLoader = value;
    });
  }
}
