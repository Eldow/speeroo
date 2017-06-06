import { Component, Input } from '@angular/core';
import { User } from '../../user/user.class';
import { AutoService } from '../auto.service';
import {Auto} from '../auto.class';

@Component({
  selector: 'auto-detail',
  templateUrl: './auto.detail.html',
  styleUrls: ['./auto.detail.css']
})

export class AutoDetail {

  @Input() auto: User;

  constructor(public autoService: AutoService) {}

  public joinAuto(a: Auto){
    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = { 'name': profile.nickname, 'userId': profile.user_id };
    a.clients.push(user);
    this.autoService.updateAuto(a);
  }

}
