import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Auto } from './auto.class';

const baseUrl = 'http://localhost:5200/api/autos';

@Injectable()
export class AutoService {
  constructor(public http: Http) {}

  public createAuto(auto: any): Observable<Auto> {
    const response = this.http.post(baseUrl, auto,
     {headers: contentHeaders}).map(this.mapAuto.bind(this));
    return response;
  }

  public updateAuto(auto: Auto): Observable<any> {
    const response = this.http.put(baseUrl + '/' + encodeURI(auto._id), auto,
      {headers: contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public retrieveAutosByOwnership(ownerId: string): Observable<any> {
    const response = this.http.get(baseUrl + '/owner/' + encodeURI(ownerId),
      {headers: contentHeaders});
    if (response) {
      response.map(this.mapAuto.bind(this));
    }
    return response;
  }

  public retrieveAutoByClientship(clientId: string): Observable<any> {
    const response = this.http.get(baseUrl + '/client/' + encodeURI(clientId),
      {headers: contentHeaders});
    if (response) {
      response.map(this.mapAuto.bind(this));
    }
    return response;
  }

  public retrieveAutosByDestinations(from: string, to: string): Observable<Auto[]>{
    const response = this.http.post(baseUrl + '/search/', { 'dep': from, 'dest': to },
      {headers: contentHeaders}).map(this.mapAuto.bind(this));
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

  private mapAuto(response: Response): Auto {
    return this.toAuto(response.json().friendlist);
  }

  private toAuto(r: any): Auto {
      const auto = <Auto>({
      _id: r._id,
      owner: r.owner,
      clients: r.clients,
      description: r.description,
      destinations: r.destination,
      constraints: r.constraints
    })
    return auto;
  }
}
