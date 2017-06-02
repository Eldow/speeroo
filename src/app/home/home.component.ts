import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  peer = new Peer({key: 'l23p62b0pco9a4i'});
  response : any;
  constructor(public router: Router, public auth: AuthService,
    public userService: UserService) {
    this.peer.on('open', function(id) {
      let profile = JSON.parse(localStorage.getItem('profile'));
      userService.updateUser({"name": profile.nickname,
        "userId": profile.user_id, "peerId": id})
        .subscribe(response => {this.response = response});
    });
  }
}
