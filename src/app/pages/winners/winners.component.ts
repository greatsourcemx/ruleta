import { Component, OnInit } from '@angular/core';
import { Winner } from '../../models/winner.model';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styles: []
})
export class WinnersComponent implements OnInit {

  winners: Winner[] = [];

  constructor(public _eventService: EventsService) { }

  ngOnInit() {
    this.loadGanadores();
  }

  loadGanadores() {
    this._eventService.loadWinners()
    .subscribe((data: Winner[]) => {
      this.winners = data;
    });
  }

  getImage( winner: Winner ): string {
    return `../../../assets/images/gifts/${ winner.gift.Image }`;
  }

}
