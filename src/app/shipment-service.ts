import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime, of, tap } from 'rxjs';
import { Letter } from '../models/letter';
import { Package } from '../models/package';
import { PostOffice } from '../models/post-office';
import { Shipment } from '../models/shipment';

const shipments: Shipment[] = [
  new Letter(1, 2, new PostOffice(1, '123', [])),
  new Package(2, 0.2, new PostOffice(2, '345', [])),
  new Package(3, 6, new PostOffice(3, '56', [])),
];

export type ShipmentState = {
  shipments: Shipment[];
  searchTerm: string;
};

@Injectable({
  providedIn: 'root',
})
export class ShipmentService {
  private readonly store = new BehaviorSubject<ShipmentState>({
    shipments,
    searchTerm: '',
  });

  readonly state$ = this.store.asObservable().pipe(
    debounceTime(100),
    tap((state) => {
      this.store.next({
        ...this.store.value,
        shipments: this.store.value.shipments.filter((shipment) =>
          shipment.postOffice.zip.includes(state.searchTerm)
        ),
      });
    })
  );

  addShipment(form: {
    id: number;
    weight: number;
    postOfficeId: number;
    postOfficeZip: string;
  }) {
    this.store.next({
      ...this.store.value,
      shipments: [
        ...this.store.value.shipments,
        new Letter(
          form.id,
          form.weight,
          new PostOffice(form.postOfficeId, form.postOfficeZip)
        ),
      ],
    });

    return this.state$;
  }

  delete(id: Shipment['id']) {
    this.store.next({
      ...this.store.value,
      shipments: this.store.value.shipments.filter(
        (shipment) => shipment.id !== id
      ),
    });

    return of(id);
  }

  changeSearchTerm(value: string) {
    if (!value) {
      this.store.next({ shipments, searchTerm: '' });
      return;
    }

    this.store.next({ ...this.store.value, searchTerm: value });
  }
}
