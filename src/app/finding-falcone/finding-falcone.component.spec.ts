import { DestinationComponent } from './../destination/destination.component';
import { Planet } from './../models/planet';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingFalconeComponent } from './finding-falcone.component';
import { DataService } from '../services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { By } from '@angular/platform-browser';

describe('FindingFalconeComponent', () => {
  let component: FindingFalconeComponent;
  let fixture: ComponentFixture<FindingFalconeComponent>;
  let mockDataService;
  let Planets;
  let Vehicles;
  let Token;
  let FalconeResult;

  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getPlanets', 'getVehicles', 'getToken', 'findFalcone']);
    Planets = [
      { name: 'Donlon', distance: 100 },
      { name: 'Enchai', distance: 200 },
      { name: 'Jebing', distance: 300 }
    ];

    Vehicles = [
      {name: 'Space pod', total_no: 2, max_distance: 200, speed: 2},
      {name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4},
      {name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5},
      {name: 'Space ship', total_no: 2, max_distance: 600, speed: 10}
    ];

    Token = {token: 'hEamjyLSwjDAUeUXfWDRDZEgfnmDYSdz'};

    FalconeResult =  {planet_name: 'Donlon', status: 'success'};

    TestBed.configureTestingModule({
      declarations: [ FindingFalconeComponent, MockComponent(DestinationComponent) ],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingFalconeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Find Falcone Button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#btnFindFalcone').textContent).toContain('Find Falcone');
  });

  it('should contain Reset Button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#btnReset').textContent).toContain('Reset');
  });
  it('should contain 4 child components', () => {
    const children = fixture.debugElement.queryAll(By.directive(DestinationComponent)).map(el => el.componentInstance);
    expect(4).toEqual(children.length);
  });

});
