import { Component, Input } from '@angular/core';
import { UserService} from '../../user/user.service';
import { User } from '../../user/user.class';

@Component({
  selector: 'friend-search',
  templateUrl: './friend.search.html',
  styleUrls: ['./friend.search.css']
})

export class FriendSearch {
  @Input()
  searchName: string;
  searchResults = [];
  constructor( public userService : UserService){

  }

  public searchFriend(){
    this.userService.getUsersByName(this.searchName).subscribe(data => this.searchResults = data);
  }

}
