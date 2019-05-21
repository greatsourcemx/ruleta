import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player/player.service';
import { EventsService } from '../../services/events/events.service';
import { Evento } from '../../models/event.model';
import { Player } from '../../models/player.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
  // tslint:disable-next-line:use-host-property-decorator
  host: {'(document:keypress)': 'handleKeyboardEvent($event)' }
})
export class HomeComponent implements OnInit {

  evento: Evento = new Evento();
  player = new Player();

  handleKeyboardEvent(event: any) {
    if (event.key !== 'Enter' && event.path[0].localName !== 'input' ) {
      this.player.Scan = this.player.Scan + event.key;
    }
    if (event.key === 'Enter') {
      this.getNumber();
    }
  }

  constructor(public playService: PlayerService,
              public eventService: EventsService) { }

  ngOnInit() {
    this.loadEvent();
  }

  loadEvent() {
    this.eventService.loadEvent()
    .subscribe((data: Evento) => {
      this.evento = data;
    });
  }

  getNumber() {
    if ( this.player.Scan.substr(0, 1) === '5' && this.player.Scan.substr(this.player.Scan.length - 1) === 'A' ) {
      const Idnumber = Number(this.player.Scan.substr(1, this.player.Scan.length - 2));
      this.player.NoEmpleado = Idnumber;
    } else {
      this.player.NoEmpleado = Number(this.player.Scan);
    }
    if (this.player.NoEmpleado !== 0) {
      this.isNotInList();
    } else {
      this.player.Scan = '';
      swal({
        position: 'top-end',
        type: 'warning',
        title: 'No se encontro el colaborador',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  find(  ) {
    if ( this.player.Scan === '' ) {
      return;
    }
    this.playService.findPlayer( this.player )
    .subscribe((data: Player) => {
      this.player.Scan = '';
      if ( data.Name === '' ) {
        swal({
          position: 'top-end',
          type: 'warning',
          title: 'No se encontro el colaborador',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.evento.players.push( data );
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Se agregó al Colaborador',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  isNotInList() {
    if ( this.player.Scan === '' ) {
      return;
    }
    let x = this.evento.players.filter( p => p.Scan === this.player.Scan )[0];
    if (x === undefined) {
      x = this.evento.players.filter( p => p.NoEmpleado.toString() === this.player.Scan )[0];
    }
    if (x === undefined) {
      this.find();
    } else {
      this.player.Scan = '';
      swal({
        position: 'top-end',
        type: 'warning',
        title: 'El colaborado ya se encuentra participando',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

}
