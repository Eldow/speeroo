import { Component } from '@angular/core';
import { AutoService } from '../auto.service';

@Component({
  selector: 'auto-list',
  templateUrl: './auto.list.html',
  styleUrls: ['./auto.list.css']
})

export class AutoList {

  constructor(public autoService: AutoService) {
  }
}
