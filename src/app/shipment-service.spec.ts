import { TestBed } from '@angular/core/testing';
import { ShipmentService } from './shipment-service';

describe('ShipmentServiceService', () => {
  let service: ShipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShipmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
