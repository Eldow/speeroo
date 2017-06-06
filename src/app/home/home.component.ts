import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {AutoService} from '../auto/auto.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  ownedTrips = [];
  clientTrips = [];
  constructor (public auth: AuthService, public auto: AutoService) {
    const profile = JSON.parse(localStorage.getItem('profile'));
    auto.retrieveAutosByClientship(profile.user_id).subscribe(clientAutos => {
      this.clientTrips = clientAutos;
    });
    auto.retrieveAutosByOwnership(profile.user_id).subscribe(ownedAutos => {
      this.ownedTrips = ownedAutos;
    });
  }
}
