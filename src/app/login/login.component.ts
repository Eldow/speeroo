import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(public router: Router, public auth: AuthService) {

  }
  public login() {
    if (!this.auth.authenticated()) {
      this.auth.login();
    }
  }
}
