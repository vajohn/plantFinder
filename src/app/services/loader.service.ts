import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  showLoader: boolean;
  // EventEmitter should not be used this way - only for `@Output()`s
  shouldShowLoader: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.showLoader = false;
  }

  showHide() {
    this.showLoader = !this.showLoader;
    this.shouldShowLoader.next(this.showLoader);
  }
}
