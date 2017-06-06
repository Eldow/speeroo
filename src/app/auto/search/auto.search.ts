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
  constructor(public locationService: LocationService) {

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
      if (this.isDepValid() && this.isDestValid()) {
          return true;
      }
      return false;
  }
}
