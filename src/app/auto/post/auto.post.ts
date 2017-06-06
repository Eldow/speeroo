import { Component } from '@angular/core';
import { AutoService } from '../auto.service';
import { Auto } from '../auto.class';

@Component({
  selector: 'auto-post',
  templateUrl: './auto.post.html',
  styleUrls: ['./auto.post.css']
})

export class AutoPost {

  auto: Auto = {
    owner: {},
    description: '',
    destinations: [],
    constraints: {
      seats: 1,
      pets: false,
      smoker: false,
      music: false
    }
  } as Auto;
  destinationName: string;
  destinationDate = Date.now();
  minDate = Date.now();

  constructor(public autoService: AutoService) {
  }

  public addDestination(d: any) {
    this.auto.destinations.push({ 'name': this.destinationName, 'date': this.destinationDate});
  }

  public removeDestination(d: any) {
    const index = this.auto.destinations.indexOf(d);
    this.auto.destinations.splice(index, 1);
  }

  public postAuto() {
    const profile = JSON.parse(localStorage.getItem(('profile')));
    this.auto.owner = { 'name': profile.nickname, 'userId': profile.user_id };
    console.log(this.auto);
    console.log('post');
    //this.autoService.createAuto(this.auto);
  }
}
