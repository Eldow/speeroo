import { Component, OnInit} from '@angular/core';
import { FriendlistService} from '../friendlist.service';
import { Friendlist } from '../friendlist.class';
import { User } from '../../user/user.class';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'friend-list',
  templateUrl: './friend.list.html',
  styleUrls: ['./friend.list.css']
})

export class FriendList {
  friendlist: Friendlist
  peer = new Peer(JSON.parse(localStorage.getItem('profile')).userId, {host: 'speeroo.herokuapp.com', secure:true, port:443 });
  //peer = new Peer({key: 'l23p62b0pco9a4i'});
  response : any;

  constructor(public friendlistService : FriendlistService,
    public router: Router, public auth: AuthService,
    public userService: UserService) {
    this.peer.on('open', function(id) {
      let profile = JSON.parse(localStorage.getItem('profile'));
      userService.updateUser({"name": profile.nickname,
        "userId": profile.user_id, "peerId": id})
        .subscribe(response => {this.response = response});
    });
  }

  ngOnInit(){
    let profile = JSON.parse(localStorage.getItem("profile"));
    this.friendlistService.retrieveFriendlist(profile.user_id).subscribe(data => {
      if(data._body == "null") {
        console.log("New friendlist needs to be created");
        this.friendlistService.createFriendlist({"owner": { "name": profile.nickname,
        "userId": profile.user_id }}).subscribe(data => {
          this.friendlist = data;
        })
      } else {
        console.log("Friendlist has been found");
        this.friendlist = data.json();
      }
    })
  }

  public addFriend(friend: User){
    this.friendlist.list.push(friend);
    this.friendlistService.updateFriendlist(this.friendlist).subscribe(data => {
      console.log(data);
    });
  }
}
