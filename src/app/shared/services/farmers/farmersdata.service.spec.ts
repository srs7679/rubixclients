import { TestBed } from '@angular/core/testing';

import { FarmersdataService } from './farmersdata.service';

describe('FarmersdataService', () => {
  let service: FarmersdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmersdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
