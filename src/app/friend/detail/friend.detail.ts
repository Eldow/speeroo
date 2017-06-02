import { Component, Input } from '@angular/core';
import { User } from '../../user/user.class';

@Component({
  selector: 'friend-detail',
  templateUrl: './friend.detail.html',
  styleUrls: ['./friend.detail.css']
})


export class FriendDetail {
  @Input()
  friend: User;
}
