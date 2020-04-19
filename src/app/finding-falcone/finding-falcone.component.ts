import { DestinationComponent } from './../destination/destination.component';
import { Component, OnInit, ViewChild, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
import { DataService } from './../services/data.service';
import { Planet } from '../models/planet';
import { Vehicle } from '../models/vehicle';
import { Router } from '@angular/router';
@Component({
  selector: 'app-finding-falcone',
  templateUrl: './finding-falcone.component.html',
  styleUrls: ['./finding-falcone.component.css']
})
export class FindingFalconeComponent implements OnInit, AfterViewInit {
  vehicles: Vehicle[];
  totalTimeTaken = 0;
  enableFindButton = false;
  destinations: DestinationComponent[];

  @ViewChildren('destination') destinationsList: QueryList<DestinationComponent>;

  constructor(private dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.getVehicles();
  }

  ngAfterViewInit() {
    this.destinations = this.destinationsList.toArray();
    this.getPlanets();
  }

  // Gets the planets from Service
  getPlanets(): void {
    this.dataService.getPlanets().subscribe(
      (data: Planet[]) => {
        this.destinations[0].planets = data;
      }
    );
  }

  // Gets vehicles from Service
  getVehicles(): void {
    this.dataService.getVehicles().subscribe(
      (data: Vehicle[]) => {
        this.vehicles = data;
      }
    );
  }

  onPlanetSelected(selDestination: DestinationComponent) {
    const destinationId = Number(selDestination.Id);
    // Set the vehicles Data source
    if (destinationId === 1) {
      this.destinations[0].vehicles = this.vehicles.map(x => Object.assign({}, x));
    } else {
      this.destinations[destinationId - 1].vehicles = this.destinations[destinationId - 2].vehicles.map(x => Object.assign({}, x));
    }
    // Clear other planets and vehicles data source and reset selected values
    this.destinations.forEach((item, index) => {
      if (Number(item.Id) > destinationId) {
        item.clearDataSource();
        item.reset();
      } else if (Number(item.Id) === destinationId) {
        item.vehicle.reset();
        item.previousVehicle = undefined;
        item.timeTaken = 0;
      }
    });

    if (destinationId !== this.destinations.length) {
      // Assign Destination planets data source
      this.destinations[destinationId].planets = this.destinations[destinationId - 1].planets.filter((item) => {
        return item.name !== this.destinations[destinationId - 1].planet.selectedPlanet.name;
      });
    }
    // Disable Find Falcone button
    this.enableFindButton = selDestination.Id === this.destinations.length;
    this.calculateTime();
  }

  onVehicleSelected(selDestination: DestinationComponent) {
    const destinationId = Number(selDestination.Id);
    // Clear other vehicles data source and reset selected values
    this.destinations.forEach((item, index) => {
      if (item.Id > destinationId) {
        item.vehicles = [];
        item.reset();
      }
    });
    // Disable Find Falcone button
    this.enableFindButton = destinationId === this.destinations.length;
    this.calculateTime();
  }

  // Reset Button Event - Resets the selected values
  reset() {
    this.destinations.forEach((item, index) => {
      if (Number(item.Id) === 1) {
        item.vehicles = [];
      } else {
        item.clearDataSource();
      }
      item.reset();
    });
    this.totalTimeTaken = 0;
  }

  // Find Falcone Button Event
  findFalcone() {
    // Get token and call Find Falcone API with the received token
    this.getTokenAndFind();
  }

  // Get Token and Find the Falcone
  getTokenAndFind() {
    const self = this;
    this.dataService.getToken().subscribe(
      (data: any) => self.callFindFalconeAPI(data.token)
    );
  }

  callFindFalconeAPI(token) {
    const self = this;

    const reqBody = {
      token,
      planet_names: this.getSelectedPlanets(),
      vehicle_names: this.getSelectedVehicles()
    };
    this.dataService.findFalcone(reqBody).subscribe(
      (data: any) => {
        // Redirect to result page and display result
        self.dataService.findFalconeResult = data;
        self.dataService.timeTaken = self.totalTimeTaken;
        self.router.navigate(['/result']);
      }
    );
  }

  // Calculates the total time taken for the search
  calculateTime(): void {
    this.totalTimeTaken = 0;
    this.destinations.forEach((destination, index) => {
      this.totalTimeTaken += destination.timeTaken;
    });
  }

  // Get Selected Planet Names
  getSelectedPlanets(): string[] {
    const planetNames = [];
    this.destinations.forEach((destination, index) => {
      planetNames.push(destination.planet.selectedPlanet.name);
    });
    return planetNames;
  }

  // Get Selected Vehicle Names
  getSelectedVehicles(): string[] {
    const vehicleNames = [];
    this.destinations.forEach((destination, index) => {
      vehicleNames.push(destination.vehicle.selectedVehicle.name);
    });
    return vehicleNames;
  }

}
