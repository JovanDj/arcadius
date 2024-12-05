import { Shipment } from './shipment';

export class PostOffice {
  constructor(
    readonly id: number,
    readonly zip: string,
    readonly shipments: Shipment[] = []
  ) {}
}
