import { TestBed } from '@angular/core/testing';

import { Stocks } from './stocks';

describe('Stocks', () => {
  let service: Stocks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Stocks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
