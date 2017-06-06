import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AutoService } from '../auto.service';
import { Auto } from '../auto.class';

@Component({
  selector: 'auto-detail',
  templateUrl: './auto.detail.html',
  styleUrls: ['./auto.detail.css']
})

export class AutoDetail {

  @Input() auto: Auto;
  @Output() autoDeleted: EventEmitter<any> = new EventEmitter();
  seatsNumber: number;
  hasJoined = false;

  constructor(public autoService: AutoService) {}

  public joinAuto() {
    if (this.auto.constraints.seats <= 0) {
      return;
    }
    const profile = JSON.parse(localStorage.getItem('profile'));
    const user = { 'name': profile.nickname, 'userId': profile.user_id };
    for (let i = 0; i < this.seatsNumber; i++) {
      this.auto.clients.push(user);
      this.auto.constraints.seats--;
    }
    this.autoService.updateAuto(this.auto).subscribe(() => { this.hasJoined = true; });
  }

  public deleteAuto() {
    this.autoDeleted.emit();
    this.autoService.deleteAuto(this.auto).subscribe(() => {});
  }

  public cancelAuto() {
    this.autoDeleted.emit();
    const profile = JSON.parse(localStorage.getItem('profile'));
    for (let i = 0; i < this.auto.clients.length; i++) {
      if (this.auto.clients[i].userId === profile.user_id) {
        this.auto.clients.splice(i, 1);
        this.auto.constraints.seats++;
      }
    }
    this.autoService.updateAuto(this.auto).subscribe(() => {});
  }

  public isClient() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const index = this.auto.clients.findIndex(c =>
      c.userId === profile.user_id
    );
    return index !== -1;
  }

  public isOwner() {
    const profile = JSON.parse(localStorage.getItem('profile'));
    return profile.user_id === this.auto.owner.userId;
  }

}
