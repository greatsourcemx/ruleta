import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { Player } from '../../models/player.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styles: []
})
export class ParticipantsComponent implements OnInit {

  participants: Player[] = [];

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
    this.loadParticipants();
  }

  loadParticipants () {
    this.playerService.getParticipants()
    .subscribe((data: Player[]) => {
      this.participants = data;
    });
  }

  convertPlayer( player: Player ) {
    this.playerService.setParticipant( player )
    .subscribe((data: any) => {
      this.loadParticipants();
      swal({
        position: 'top-end',
        type: 'success',
        title: 'Se confirmo la asistencia',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

}
