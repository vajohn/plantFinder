import {getTestBed, TestBed} from '@angular/core/testing';

import { PlantsDataService } from './plants-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import {PlantsModel} from '../models/plantsModel';
import {filterTestData, plantTestData} from '../strings';

describe('PlantsDataService', () => {
  let plantsService: PlantsDataService;
  let httpMock: HttpTestingController;
  let injector: TestBed;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [PlantsDataService]
    });
    injector = getTestBed();
    plantsService = TestBed.get(PlantsDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: PlantsDataService = TestBed.get(PlantsDataService);
    expect(service).toBeTruthy();
  });

  it('should return an Observable', () => {
    const dummyData: PlantsModel[] = plantTestData;

    plantsService.getPlants().subscribe(data => {
      expect(data.length).toBeGreaterThan(1);
      expect(data).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${plantsService.baseUrl}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });

  it('should return an Observable checking for Summer filter', () => {
    const dummyData: PlantsModel[] = filterTestData;

    plantsService.searchForPlants({bloom_time: 'Summer'}).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    const request = httpMock.expectOne(`${plantsService.baseUrl}?bloom_time=Summer`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyData);
  });
  afterEach(() => {
    httpMock.verify();
  });
});
