import { Planet } from './../models/planet';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})
export class PlanetComponent implements OnInit {
  selectedPlanet: Planet;

  @Input() planets: Planet[];
  @Output() planetSelected: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onPlanetSelected() {
    if (this.selectedPlanet !== undefined) {
      this.planetSelected.emit(this.selectedPlanet);
    }
  }

  reset() {
    this.selectedPlanet = undefined;
  }

}
