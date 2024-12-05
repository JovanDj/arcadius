import { Letter } from './letter';
import { PostOffice } from './post-office';
import { Shipment } from './shipment';

describe('Shipment', () => {
  let postOffice: PostOffice;

  beforeEach(() => {
    postOffice = new PostOffice(1, '123');
  });

  it('should categorize shipments less than 1kg', () => {
    const shipment: Shipment = new Letter(1, 0.1, postOffice);

    expect(shipment.weightCategory()).toBe('Less than 1kg');
  });

  it('should categorize shipments between 1kg and 5kg', () => {
    const shipment: Shipment = new Letter(1, 2, postOffice);

    expect(shipment.weightCategory()).toBe('Between 1kg and 5kg');
  });

  it('should categorize shipments more than 5kg', () => {
    const shipment: Shipment = new Letter(1, 6, postOffice);

    expect(shipment.weightCategory()).toBe('More than 5kg');
  });
});
