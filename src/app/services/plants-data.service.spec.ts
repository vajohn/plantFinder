import { TestBed } from '@angular/core/testing';

import { PlantsDataService } from './plants-data.service';

describe('PlantsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantsDataService = TestBed.get(PlantsDataService);
    expect(service).toBeTruthy();
  });
});
