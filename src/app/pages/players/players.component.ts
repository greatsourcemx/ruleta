import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styles: []
})
export class PlayersComponent implements OnInit {

  players: Player[] = [];

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.loadCurrentEvent();
  }

  loadCurrentEvent () {
    this.playerService.getAllPlayers()
    .subscribe((data: Player[]) => {
      this.players = data;
    });
  }

}
