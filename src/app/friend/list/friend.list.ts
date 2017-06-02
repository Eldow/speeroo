import { Component } from '@angular/core';
import { FriendlistService} from '../friendlist.service';
import { Friendlist } from '../friendlist.class';

@Component({
  selector: 'friend-list',
  templateUrl: './friend.list.html',
  styleUrls: ['./friend.list.css']
})

export class FriendList {
  friendlist: Friendlist
  constructor(public friendlistService: FriendlistService){
    let profile = JSON.parse(localStorage.getItem("profile"));
    friendlistService.retrieveFriendlist(profile.user_id).subscribe(data => {
      if(data._body == "null") {
        console.log("New friendlist needs to be created");
        friendlistService.createFriendlist({"owner": { "name": profile.nickname,
        "userId": profile.user_id }}).subscribe(data => {
          this.friendlist = data;
        })
      } else {
        console.log("Friendlist has been found");
        this.friendlist = data.json();
      }
    })
  }
}
