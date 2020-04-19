import { VehicleComponent } from './../vehicle/vehicle.component';
import { PlanetComponent } from './../planet/planet.component';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinationComponent } from './destination.component';
import { MockComponent } from 'ng-mocks';

describe('DestinationComponent', () => {
  let component: DestinationComponent;
  let fixture: ComponentFixture<DestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinationComponent,MockComponent(PlanetComponent), MockComponent(VehicleComponent) ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinationComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should clear planets and vehicles on calling clearDataSource', () => {
    component.clearDataSource();
    expect(component.vehicles).toEqual([]);
    expect(component.planets).toEqual([]);
  });  

});
