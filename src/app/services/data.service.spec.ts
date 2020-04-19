import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';
import { Planet } from '../models/planet';
import { Vehicle } from '../models/vehicle';

describe('DataService', () => {
  let dataService: DataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService
      ]
    });
    dataService = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all planets', () => {
    const dummyPlanets: Planet[] = [
      { name: 'Donlon', distance: 100 },
      { name: 'Enchai', distance: 200 },
      { name: 'Jebing', distance: 300 }
    ];

    dataService.getPlanets().subscribe(planets => {
      expect(planets.length).toBe(3);
      expect(planets).toEqual(dummyPlanets);
    });

    const request = httpMock.expectOne(`${dataService.planetsapi_uri}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyPlanets);
  });

  it('should retrieve all vehicles', () => {
    const dummyVehicles: Vehicle[] = [
      {name: 'Space pod', total_no: 2, max_distance: 200, speed: 2},
      {name: 'Space rocket', total_no: 1, max_distance: 300, speed: 4},
      {name: 'Space shuttle', total_no: 1, max_distance: 400, speed: 5},
      {name: 'Space ship', total_no: 2, max_distance: 600, speed: 10}
    ];

    dataService.getVehicles().subscribe(vehicles => {
      expect(vehicles.length).toBe(4);
      expect(vehicles).toEqual(dummyVehicles);
    });

    const request = httpMock.expectOne(`${dataService.vehicleapi_uri}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyVehicles);
  });

  it('should retrieve token', () => {
    const dummyToken: any = {token: 'hEamjyLSwjDAUeUXfWDRDZEgfnmDYSdz'};

    dataService.getToken().subscribe(token => {
      expect(token).toEqual(dummyToken);
    });

    const request = httpMock.expectOne(`${dataService.tokenapi_uri}`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyToken);
  });

  it('should provide the FindFalcone status', () => {
    const dummyStatus: any = {planet_name: 'Donlon', status: 'success'};
    const dummyReqBody = {
      token: 'FCuprwdZeOpPqAoydDVmJUPZBAJtSpVV',
      planet_names: ['Donlon', 'Enchai', 'Jebing', 'Pingasor'],
      vehicle_names: ['Space pod', 'Space rocket', 'Space shuttle', 'Space ship']
      };
    dataService.findFalcone(dummyReqBody).subscribe(status => {
      expect(status).toEqual(dummyStatus);
    });

    const request = httpMock.expectOne(`${dataService.findfaloneapi_uri}`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyStatus);
  });

});
