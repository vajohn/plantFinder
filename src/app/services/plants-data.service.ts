import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantsModel} from '../models/plantsModel';
import {catchError, delay, map, retry} from 'rxjs/operators';
import {LoaderService} from './loader.service';
import {MatSnackBar} from '@angular/material';
import {throwError} from 'rxjs';
import {ToastComponent} from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class PlantsDataService {

  baseUrl = 'https://data.sfgov.org/resource/vmnk-skih.json';
  private delayTime = 50000;

  constructor(private http: HttpClient, private ls: LoaderService, private sb: MatSnackBar) {
  }

  getPlants(offset: number) {
    this.ls.showHide();
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: {$limit: '15', $offset: offset.toString()}}
    ).pipe(
      delay(this.delayTime),
      map(data => {
        this.ls.showHide();
        return data;
      }),
      retry(3),
      catchError(this.errorHandler)
    );
  }

  searchForPlants(parameters) {
    this.ls.showHide();
    // append parameters

    parameters.$limit = '10';
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: parameters}
    ).pipe(
      delay(this.delayTime),
      map(data => {
        this.ls.showHide();
        return data;
      }),
      retry(3),
      catchError(this.errorHandler));
  }

  getOdoredPlants(offset: number, order: string) {
    this.ls.showHide();
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: {$limit: '15', $offset: offset.toString(), $order: order}}
    ).pipe(
      delay(this.delayTime),
      map(data => {
        this.ls.showHide();
        return data;
      }),
      retry(3),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage: string;

    if (error.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    // customer friendly dialog
    this.sb.openFromComponent(ToastComponent, {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'start',
      data: {text: error},
      panelClass: 'errorToast'
    });

    return throwError(errorMessage);
  }
}
