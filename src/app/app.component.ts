import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, tap } from 'rxjs';
import { Shipment } from '../models/shipment';
import { ShipmentService, ShipmentState } from './shipment-service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AsyncPipe, NgbPaginationModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly state$: Observable<ShipmentState>;

  shipmentForm: FormGroup;

  constructor(
    private readonly shipmentService: ShipmentService,
    private readonly fb: FormBuilder
  ) {
    this.state$ = this.shipmentService.state$;
    this.shipmentForm = this.initForm();
  }

  private initForm() {
    return this.fb.group({
      id: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.min(0.1)]],
      postOfficeId: [null, [Validators.required]],
      postOfficeZip: ['', [Validators.required]],
    });
  }

  addShipment(form: {
    id: number;
    weight: number;
    postOfficeId: number;
    postOfficeZip: string;
  }) {
    this.shipmentService.addShipment(form).subscribe();
  }

  remove(id: Shipment['id']) {
    this.shipmentService
      .delete(id)
      .pipe(
        tap((id) => {
          alert(`Shipment with ID ${id} is deleted.`);
        })
      )
      .subscribe();
  }

  onSearch($event: Event) {
    if ($event.target instanceof HTMLInputElement) {
      this.shipmentService.changeSearchTerm($event.target.value);
    }
  }

  ngOnInit() {}
}
