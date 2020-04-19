import { VehicleComponent } from './../vehicle/vehicle.component';
import { PlanetComponent } from './../planet/planet.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Planet } from '../models/planet';
import { Vehicle } from '../models/vehicle';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  selectedPlanet: Planet;
  previousVehicle: Vehicle;
  timeTaken = 0;

  planets: Planet[];
  vehicles: Vehicle[];

  @Input() Id: number;
  @Output() planetSelected: EventEmitter<any> = new EventEmitter();
  @Output() vehicleSelected: EventEmitter<any> = new EventEmitter();

  @ViewChild('planet', { static: false }) planet: PlanetComponent;
  @ViewChild('vehicle', { static: false }) vehicle: VehicleComponent;

  constructor() {

  }

  ngOnInit() {

  }

  onPlanetSelected(selPlanet) {
    if (this.planet.selectedPlanet != undefined) {
      this.selectedPlanet = selPlanet;
      this.planetSelected.emit(this);
    }
  }

  onVehicleSelected(selVehicle) {
    if (this.vehicle.selectedVehicle !== undefined) {
      this.calculateTimeTaken();
      this.vehicles = this.updateVehiclesCount(this.previousVehicle, this.vehicles, this.vehicle.selectedVehicle);
      this.previousVehicle = this.vehicle.selectedVehicle;
      this.vehicleSelected.emit(this);
    }
  }

  reset() {
    this.planet.reset();
    this.vehicle.reset();
    this.timeTaken = 0;
    this.previousVehicle = undefined;
  }

  clearDataSource() {
    this.planets = [];
    this.vehicles = [];
  }

  calculateTimeTaken() {
    if (this.vehicle.selectedVehicle !== undefined && this.vehicle.selectedVehicle.speed > 0) {
      this.timeTaken = this.planet.selectedPlanet.distance / this.vehicle.selectedVehicle.speed;
    } else {
      this.timeTaken = 0;
    }
  }

  // Function that updates the total no of vehicles left based on UI selection
  updateVehiclesCount(currVehicle: Vehicle, dsVehicles: Vehicle[], selVehicle: Vehicle): Vehicle[] {
    dsVehicles = dsVehicles.map((vehicle) => {
      // Decrement the selected vehicle count and
      // increment the previously selected vehicle count if any
      if (vehicle.name === selVehicle.name) {
        vehicle.total_no -= 1;
      } else if (currVehicle !== undefined && vehicle.name === currVehicle.name) {
        vehicle.total_no += 1;
      }
      return vehicle;
    });
    return dsVehicles;
  }
}
