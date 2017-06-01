import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(public router: Router, public auth: AuthService) {
    if(!auth.authenticated)auth.login();
  }
  title = 'Welcome on Speeroo';
}
