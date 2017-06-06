import { Component, Input } from '@angular/core';
import { AutoService } from '../auto.service';
import {Auto} from '../auto.class';

@Component({
  selector: 'auto-list',
  templateUrl: './auto.list.html',
  styleUrls: ['./auto.list.css']
})

export class AutoList {
  @Input() autos;
  @Input() constraints;
  @Input() isSearch;
  constructor(public autoService: AutoService) {
  }

  public onAutoDeleted(auto: Auto) {
    const index = this.autos.indexOf(auto);
    this.autos.splice(index, 1);
  }

  public isAutoValid(auto: Auto) {
    let indexDest = -1;
    let indexDep = -1;
    let dateDep = false;
    let dateDest = false;

    if (this.constraints === undefined) {
      return true;
    }
    /*
    if (auto.constraints.showPets !== this.constraints.pets) {
      return false;
    }
    if (auto.constraints.showMusic !== this.constraints.music) {
      return false;
    }
    if (auto.constraints.showSmoker !== this.constraints.smoker) {
      return false;
    }
    */
    if (auto.constraints.seats === 0) {
      return false;
    }

    if (auto.constraints.seats - this.constraints.seatsNumber < 0) {
      return false;
    }
    indexDep = auto.destinations.findIndex(d => d.name === this.constraints.dep);
    indexDest = auto.destinations.findIndex(d => d.name === this.constraints.dest);

    if (indexDep === -1 || indexDest === -1) {
      return false;
    }

    if (indexDep >= indexDest) {
      return false;
    }

    if (new Date(auto.destinations[indexDep].date).getFullYear() === new Date(this.constraints.date).getFullYear() &&
      new Date(auto.destinations[indexDep].date).getMonth() === new Date(this.constraints.date).getMonth() &&
      new Date(auto.destinations[indexDep].date).getDay() === new Date(this.constraints.date).getDay()) {
      dateDep = true;
    }

    if (new Date(auto.destinations[indexDest].date).getFullYear() === new Date(this.constraints.date).getFullYear() &&
      new Date(auto.destinations[indexDest].date).getMonth() === new Date(this.constraints.date).getMonth() &&
      new Date(auto.destinations[indexDest].date).getDay() === new Date(this.constraints.date).getDay()) {
      dateDest = true;
    }

    if (!dateDest && !dateDep) {
      return false;
    }
    return true;
  }
}
