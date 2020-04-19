import { DataService } from './../services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let mockDataService;
  beforeEach(async(() => {
    mockDataService = jasmine.createSpyObj(['getPlanets']);
    TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [
        { provide: DataService, useValue: mockDataService }
      ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Start Again Button', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#btnStart').textContent).toContain('Start Again');
  });
});

