import { Component, Input } from '@angular/core';
import { User } from '../../user/user.class';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'auto-detail',
  templateUrl: './auto.detail.html',
  styleUrls: ['./auto.detail.css']
})

export class AutoDetail {

  @Input() auto: User;

  constructor() {}

}
