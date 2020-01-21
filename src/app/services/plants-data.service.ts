import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantsModel} from '../models/plantsModel';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PlantsDataService {

  baseUrl = 'https://data.sfgov.org/resource/vmnk-skih.json';
  private delayTime = 5000;

  constructor(private http: HttpClient) {
  }

  getPlants(offset: number) {
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: {$limit: '15', $offset: offset.toString()}}
    ).pipe(delay(this.delayTime));
  }

  searchForPlants(parameters) {
    // append parameters

    parameters.$limit = '10';
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: parameters}
    ).pipe(delay(this.delayTime));
  }

  getOdoredPlants(offset: number, order: string) {
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: {$limit: '15', $offset: offset.toString(), $order: order}}
    ).pipe(delay(this.delayTime));
  }
}
