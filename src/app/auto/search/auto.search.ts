import { Component, Input } from '@angular/core';
import { AutoService } from '../auto.service';
import { LocationService } from '../../location/location.service';

@Component({
  selector: 'auto-search',
  templateUrl: './auto.search.html',
  styleUrls: ['./auto.search.css']
})

export class AutoSearch {
  @Input()
  searchDep: string;
  searchDepResults = [];
  searchDest: string;
  searchDestResults = [];
  nowDate: Date;
  seatsNumber: number;
  showPets = false;
  showSmoker = false;
  showMusic = false;
  searchResult: any;
  constraints: any;

  constructor(public autoService: AutoService, public locationService: LocationService) {
  }

  public updateDepCities() {
    this.locationService.getLocationByName(this.searchDep).subscribe(
        data => {this.searchDepResults = data._embedded['city:search-results']; }
    );
  }

  public setSearchDep(name: string) {
    this.searchDep = name;
  }

  public updateDestCities() {
      this.locationService.getLocationByName(this.searchDest).subscribe(
          data => {this.searchDestResults = data._embedded['city:search-results']; }
      );
  }

  public setSearchDest(name: string) {
      this.searchDest = name;
  }

  public isDepValid() {
      if (this.searchDepResults.findIndex(el => el.matching_full_name === this.searchDep) === -1) {
         return false;
      }
      return true;
  }

  public isDestValid() {
      if (this.searchDestResults.findIndex(el => el.matching_full_name === this.searchDest) === -1) {
          return false;
      }
      return true;
  }

  public isSearchFormValid() {
      if (this.isDepValid() && this.isDestValid() && this.seatsNumber >= 1) {
          return true;
      }
      return false;
  }

  public searchAuto() {
    if (!this.isSearchFormValid()) {
      return;
    }
    this.constraints = {
        dep: this.searchDep,
        dest: this.searchDest,
        date: this.nowDate,
        seats: this.seatsNumber,
        pets: this.showPets,
        smoker: this.showSmoker,
        music: this.showMusic
    };
    this.autoService.retrieveAutosByDestinations(this.searchDep, this.searchDest).subscribe(data => {
        this.searchResult = data;
    });
  }
}
