import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Planet } from './../models/planet';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  planetsapi_uri = 'https://findfalcone.herokuapp.com/planets';
  vehicleapi_uri = 'https://findfalcone.herokuapp.com/vehicles';
  tokenapi_uri = 'https://findfalcone.herokuapp.com/token';
  findfaloneapi_uri = 'https://findfalcone.herokuapp.com/find';
  findFalconeResult: any;
  timeTaken: number;

  constructor(private http: HttpClient) {

  }

  getPlanets(): Observable<Planet[]> {
    return this.http.get<Planet[]>(this.planetsapi_uri);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehicleapi_uri);
  }

  getToken(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };
    return this.http.post<any>(this.tokenapi_uri, null, httpOptions);
  }

  findFalcone(reqBody: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(this.findfaloneapi_uri, reqBody, httpOptions);
  }

}
