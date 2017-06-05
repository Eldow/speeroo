import { Component, Input } from '@angular/core';
import { AutoService } from '../auto.service';
import { Auto } from '../auto.class';

@Component({
  selector: 'auto-post',
  templateUrl: './auto.post.html',
  styleUrls: ['./auto.post.css']
})

export class AutoPost {

  @Input() auto: Auto;
  @Input() destinationName: string;
  @Input() destinationDate: Date;

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
    this.autoService.createAuto(this.auto);
  }
}
