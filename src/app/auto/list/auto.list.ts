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

    if (!this.isSearch) {
      return true;
    }

    console.log(auto.destinations);

    if (auto.constraints.showPets !== this.constraints.pets) {
      return false;
    }
    if (auto.constraints.showMusic !== this.constraints.music) {
      return false;
    }
    if (auto.constraints.showSmoker !== this.constraints.smoker) {
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

    if (auto.destinations[indexDep].date.getFullYear() === this.constraints.date.getFullYear() &&
      auto.destinations[indexDep].date.getMonth() === this.constraints.date.getMonth() &&
        auto.destinations[indexDep].date.getDay() === this.constraints.date.getDay()) {
      dateDep = true;
    }

    if (auto.destinations[indexDest].date.getFullYear() === this.constraints.date.getFullYear() &&
        auto.destinations[indexDest].date.getMonth() === this.constraints.date.getMonth() &&
        auto.destinations[indexDest].date.getDay() === this.constraints.date.getDay()) {
      dateDest = true;
    }

    if (!dateDest && !dateDep) {
      return false;
    }

    if (auto.constraints.seats === 0) {
      return false;
    }

    return true;
  }
}
