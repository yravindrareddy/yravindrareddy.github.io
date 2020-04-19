import { Planet } from './../models/planet';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  selectedVehicle: Vehicle;

  @Input() Id: number;
  @Input() vehicles: Vehicle[];
  @Input() selectedPlanet: Planet;
  @Output() vehicleSelected: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onVehicleSelected() {
    if (this.selectedVehicle !== undefined) {
      this.vehicleSelected.emit(this.selectedVehicle);
    }
  }

  reset() {
    this.selectedVehicle = undefined;
  }

}
