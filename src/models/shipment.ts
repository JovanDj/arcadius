import { PostOffice } from './post-office';

export abstract class Shipment {
  constructor(
    readonly id: number,
    readonly weight: number,
    readonly postOffice: PostOffice
  ) {
    if (weight === 0) {
      throw new Error('Weight cannot be zero.');
    }
  }

  weightCategory() {
    if (this.weight < 1) {
      return 'Less than 1kg';
    }

    if (this.weight >= 1 && this.weight < 5) {
      return 'Between 1kg and 5kg';
    }

    if (this.weight > 5) {
      return 'More than 5kg';
    }

    return 'Invalid weight.';
  }
}
