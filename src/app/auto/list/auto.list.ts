import { Component } from '@angular/core';
import { AutoService } from '../auto.service';
import { Auto } from '../auto.class';
import { User } from '../../user/user.class';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'auto-list',
  templateUrl: './auto.list.html',
  styleUrls: ['./auto.list.css']
})

export class AutoList {

  constructor(public autoService : autoService) {
  }
  
}
