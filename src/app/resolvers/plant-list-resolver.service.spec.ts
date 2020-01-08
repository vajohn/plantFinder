import { TestBed } from '@angular/core/testing';

import { PlantListResolverService } from './plant-list-resolver.service';

describe('PlantListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlantListResolverService = TestBed.get(PlantListResolverService);
    expect(service).toBeTruthy();
  });
});
