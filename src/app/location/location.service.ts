import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';

const baseUrl = 'https://api.teleport.org/api/cities';

@Injectable()
export class UserService {
  constructor(public http: Http) {}

  private logResponse(response: Response):any{
    return response.json();
  }

  public getLocationByName(name: string): Observable<any> {
    const location = this.http.get(baseUrl + '/?search=' + encodeURI(name),
     {headers: contentHeaders}).map(this.logResponse.bind(this));
    return location;
  }

}
