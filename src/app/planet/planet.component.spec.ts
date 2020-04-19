import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetComponent } from './planet.component';
import { FormsModule } from '@angular/forms';

describe('PlanetComponent', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Planet Dropdown', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.dropdownCtrl').textContent).toContain('Select');
  });
});
