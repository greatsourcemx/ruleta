import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger,  state,  style,  animate,  transition, } from '@angular/animations';
import { Evento } from '../../models/event.model';
import { EventsService } from '../../services/events/events.service';
import swal from 'sweetalert2';

declare function init_rotate();

@Component({
  selector: 'app-roulette',
  templateUrl: './roulette.component.html',
  styleUrls: ['./roulette.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('700ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('.5ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('slideOutIn', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('700ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('.5ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateY(-1000%)' }),
        animate('0.8s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeAnimation', [
      transition(':enter', [
          style({ opacity: 0 }),
          animate('3s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RouletteComponent implements OnInit {

  evento: Evento = new Evento();
  items: string[] = [];
  visible = false;
  pathImage = '';
  cargando = false;

  constructor(public eventoService: EventsService) { }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
    this.visible = !this.visible;
  }

  ngOnInit() {
    init_rotate();
    this.loadCurrentEvent();
    for (let x = 0; x < 5; x++) {
      this.items.push('0');
    }
  }

  loadCurrentEvent() {
    this.eventoService.loadEvent()
    .subscribe((data: Evento) => {
      this.evento = data;
      let i = 99990;
      for (const play of this.evento.players) {
        if ( play.NoEmpleado === -1 ) {
          play.NoEmpleado = i;
          i++;
        }
      }
    });
  }

  changeWinner() {
    if ( this.cargando ) {
      return;
    }
    this.cargando = true;
    this.visible = false;

    const IndexPlayer = Math.floor(Math.random() * this.evento.players.length);
    this.evento.CurrentWinner = this.evento.players[IndexPlayer];
    this.evento.players.splice(IndexPlayer, 1);
    if ( this.evento.CurrentGift == null ) {
      this.evento.CurrentGift = this.evento.winners[this.evento.winners.length - 1].gift;
    }
    this.pathImage = `../../../assets/images/gifts/${ this.evento.CurrentGift.Image }`;
    // Formatea el numero de empleado ganador a 5 caracteres
    const noWinner = this.pad(this.evento.CurrentWinner.NoEmpleado, this.items.length);
    setTimeout(() => {
      for (let x = 0; x < noWinner.length; x++) {
        this.items[x] = noWinner[x];
        this.visible = true;
      }
    }, 335);

    this.eventoService.changeWinner( this.evento )
        .subscribe((data: any) => {
          this.evento.winners = data;
          this.cargando = false;
      });
  }

  getRandom() {
    if ( this.cargando ) {
      return;
    }
    this.cargando = true;
    this.visible = false;
    if ( this.evento.gifts.length === 0  ) {
      swal( 'GAME OVER', 'No quedan premios en el sorteo', 'warning' );
      return;
    } else {
      // Busca el index del arreglo
      const IndexGift = Math.floor(Math.random() * this.evento.gifts.length);
      this.evento.CurrentGift = this.evento.gifts[IndexGift];
      const IndexPlayer = Math.floor(Math.random() * this.evento.players.length);

      // Selecciona el Premio y lo remueve de la lista de premios participantes
      this.evento.CurrentGift = this.evento.gifts[IndexGift];
      this.pathImage = `../../../assets/images/gifts/${ this.evento.CurrentGift.Image }`;
      this.evento.gifts.splice(IndexGift, 1);

      // Selecciona el Jugador y lo remueve de la lista de participantes
      this.evento.CurrentWinner = this.evento.players[IndexPlayer];
      this.evento.players.splice(IndexPlayer, 1);

      // Formatea el numero de empleado ganador a 5 caracteres
      const noWinner = this.pad(this.evento.CurrentWinner.NoEmpleado, this.items.length);
      setTimeout(() => {
        for (let x = 0; x < noWinner.length; x++) {
          this.items[x] = noWinner[x];
          this.visible = true;
        }
      }, 335);

      // Guarda al ganador en base de datos
      const id = this.evento.winners.length === 0 ? 1 : this.evento.winners.length + 1;
      // this.evento.winners.push(new Winner(id, this.evento.CurrentWinner, this.evento.CurrentGift));
      this.eventoService.saveWinner( this.evento )
        .subscribe((data: any) => {
          this.evento.winners = data;
          this.cargando = false;
      });
      if ( this.evento.gifts.length === 0 ) {
        for (const gif of this.evento.lastGifts ) {
          this.evento.gifts.push( gif );
        }
        this.evento.lastGifts = [];
      }
    }
  }

  pad(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) {
      s = '0' + s;
    }
    return s;
  }

}
