import { Component, Input } from '@angular/core';
import { UserService} from '../../user/user.service';

@Component({
  selector: 'auto-search',
  templateUrl: './auto.search.html',
  styleUrls: ['./auto.search.css']
})

export class AutoSearch {
  @Input()
  searchName: string;
  searchResults = [];
  constructor( public userService : UserService){

  }

  public searchFriend() {
    this.userService.getUsersByName(this.searchName).subscribe(data => this.searchResults = data);
  }

}
