import { Component } from '@angular/core';
import { AutoService } from '../auto.service';
import { Auto } from '../auto.class';
import { LocationService } from '../../location/location.service';

@Component({
    selector: 'auto-post',
    templateUrl: './auto.post.html',
    styleUrls: ['./auto.post.css']
})

export class AutoPost {
    searchDestResults = [];
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

    constructor(public locationService: LocationService, public autoService: AutoService) {
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
      this.autoService.createAuto(this.auto).subscribe(() => { });
    }

    public updateDestCities() {
        this.locationService.getLocationByName(this.destinationName).subscribe(
            data => {this.searchDestResults = data._embedded['city:search-results']; }
        );
    }

    public setSearchDest(name: string) {
        this.destinationName = name;
    }

    public isDestValid() {
        if (this.searchDestResults.findIndex(el => el.matching_full_name === this.destinationName) === -1) {
            return false;
        }
        return true;
    }

    public isDestinationValid() {
        if (this.isDestValid()) {
            return true;
        }
        return false;
    }

    public isPostFormValid() {
        if (this.auto.constraints.seats >= 1 && this.auto.description && this.auto.destinations.length >= 2) {
            return true;
        }
        return false;
    }
}
