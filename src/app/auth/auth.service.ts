import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthConfig }      from './auth.config';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  lock = new Auth0Lock(AuthConfig.clientID, AuthConfig.domain, {
    theme: {
      primaryColor: '#005375'
    },
    auth: {
      responseType: 'token',
      redirectUrl: 'https://speeroo.herokuapp.com'
    },
    languageDictionary: {
      title: 'Have fun on Speeroo >:3'
    }
  });
  response: any;

  constructor(public router: Router, public userService : UserService) {
    if(this.authenticated()){
      this.router.navigate(['home']);
    }
    this.lock.on('authenticated', authResult => {
      this.registerTokens(authResult);
    });
  }

  private registerTokens(authResult) {
    // Use the token in authResult to getUserInfo() and save it to localStorage
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      localStorage.setItem('token', authResult.idToken);
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('accessToken', authResult.accessToken);
      if(profile.signed_up){
        console.log('Enjoy your journey on Speeroo, ' + profile.nickname);
        this.userService.createUser({'name': profile.nickname, 'userId': profile.user_id, 'peerId': ''}).subscribe(data => {
          this.response = data.message;
        });
      } else {
        console.log('Welcome back, ' + profile.nickname);
      }
      this.router.navigate(['home']);
    });
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.router.navigate(['login']);
  };
}
