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
  constructor(public autoService: AutoService) {
  }

  public onAutoDeleted(auto: Auto) {
    const index = this.autos.indexOf(auto);
    this.autos.splice(index, 1);
  }
}
