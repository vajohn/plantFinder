import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PlantsDataService} from '../services/plants-data.service';

@Injectable()
export class PlantsListResolver {

  constructor(private plantsDataService: PlantsDataService) {
  }

  resolve(): Observable<any> | Observable<never> {
    return this.plantsDataService.getPlants(0);
  }
}
