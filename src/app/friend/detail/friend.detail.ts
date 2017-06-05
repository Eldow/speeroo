import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'friend-detail',
  templateUrl: './friend.detail.html',
  styleUrls: ['./friend.detail.css']
})

export class FriendDetail implements OnInit{

  @Input() friend: User;
  @Output() friendCalled: EventEmitter<any> = new EventEmitter();

  constructor(public userService: UserService) {}

  ngOnInit(){
    // Fill the peerId of each friend
    this.userService.getUserByUserId(this.friend.userId).subscribe(data => {
      this.friend.peerId = data.peerId;
    });

  }

  // Call a friend
  public call(friend:User){
    this.friendCalled.emit();
  }

  // Answer a call
  public answer(){

  }

  // Display your friend's stream
  private displayTheirStream(){

  }

  // Decline a call
  public decline(){

  }
}
