import { TestBed } from '@angular/core/testing';

import { DatasetStoreService } from './dataset-store.service';

describe('DatasetStoreService', () => {
  let service: DatasetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatasetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
