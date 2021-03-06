import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Auto } from './auto.class';

const baseUrl = 'https://speeroo.herokuapp.com/api/autos';

@Injectable()
export class AutoService {
  constructor(public http: Http) {}

  public createAuto(auto: any): Observable<any> {
    const response = this.http.post(baseUrl, auto,
     {headers: contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public updateAuto(auto: Auto): Observable<any> {
    const response = this.http.put(baseUrl + '/' + encodeURI(auto._id), auto,
      {headers: contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public retrieveAutosByOwnership(ownerId: string): Observable<Auto[]> {
    const response = this.http.get(baseUrl + '/owner/' + encodeURI(ownerId),
      {headers: contentHeaders}).map(this.mapAutos.bind(this));
    return response;
  }

  public retrieveAutosByClientship(clientId: string): Observable<Auto[]> {
    const response = this.http.get(baseUrl + '/client/' + encodeURI(clientId),
      {headers: contentHeaders}).map(this.mapAutos.bind(this));
    return response;
  }

  public retrieveAutosByDestinations(from: string, to: string): Observable<Auto[]> {
    const response = this.http.post(baseUrl + '/search/', { 'dep': from, 'dest': to },
      {headers: contentHeaders}).map(this.mapAutos.bind(this));
    return response;
  }

  public deleteAuto (auto: Auto): Observable<any> {
    const response = this.http.delete(baseUrl + '/' + encodeURI(auto._id),
      {headers: contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  private logResponse(response: Response): any {
    return response.json();
  }

  private mapAutos(response: Response): Auto[] {
    return response.json().map(this.toAuto.bind(this));
  }

  private toAuto(r: any): Auto {
      const auto = <Auto>({
      _id: r._id,
      owner: r.owner,
      clients: r.clients,
      description: r.description,
      destinations: r.destinations,
      constraints: r.constraints
    })
    return auto;
  }
}
