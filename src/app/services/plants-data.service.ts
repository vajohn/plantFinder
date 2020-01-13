import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantsModel} from '../models/plantsModel';


@Injectable({
  providedIn: 'root'
})
export class PlantsDataService {

  baseUrl = 'https://data.sfgov.org/resource/vmnk-skih.json';

  constructor(private http: HttpClient) {
  }

  getPlants(offset: number) {
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: {$limit: '15', $offset: offset.toString()}}
    );
  }

  searchForPlants(parameters) {
    // append parameters

    parameters.$limit = '10';
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`, {params: parameters}
    );
  }
}
