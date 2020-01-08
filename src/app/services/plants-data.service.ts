import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlantsModel} from '../models/plantsModel';

@Injectable({
  providedIn: 'root'
})
export class PlantsDataService {

  baseUrl = 'https://data.sfgov.org/resource/vmnk-skih.json';

  constructor(private http: HttpClient) {
  }

  getPlants() {
    return this.http.get<PlantsModel[]>(
      `${this.baseUrl}`
    );
  }
}
