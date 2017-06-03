import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { contentHeaders } from '../auth/auth.headers';
import { Observable } from 'rxjs/Rx';
import { Friendlist } from './friendlist.class';

const baseUrl = 'http://localhost:5200/api/friendlists';

@Injectable()
export class FriendlistService {
  constructor(public http: Http) {}

  public createFriendlist(friendlist: any): Observable<Friendlist>{
    let response = this.http.post(baseUrl, friendlist,
     {headers:contentHeaders}).map(this.mapFriendlist.bind(this));;
    return response;
  }

  public updateFriendlist(friendlist: Friendlist): Observable<any>{
    let response = this.http.put(baseUrl + "/" + encodeURI(friendlist._id), friendlist,
      {headers:contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  public retrieveFriendlist(ownerId: string): Observable<any>{
    let response = this.http.get(baseUrl + "/owner/" + encodeURI(ownerId),
      {headers:contentHeaders});
    if(response)
      response.map(this.mapFriendlist.bind(this))
    return response;
  }

  public deleteFriendlist (friendlist: Friendlist): Observable<any>{
    let response = this.http.delete(baseUrl + "/" + encodeURI(friendlist._id),
      {headers: contentHeaders}).map(this.logResponse.bind(this));
    return response;
  }

  private logResponse(response: Response):any{
    return response.json();
  }

  private mapFriendlist(response: Response): Friendlist {
    return this.toFriendlist(response.json().friendlist);
  }

  private toFriendlist(r: any): Friendlist {
    let friendlist = <Friendlist>({
      owner: r.owner,
      list: r.list,
      _id: r._id
    })
    return friendlist;
  }

}
