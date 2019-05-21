import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Player } from '../../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(public http: HttpClient) { }

  findPlayer( player: Player ) {
    const url = URL_SERVICIOS + '/player';
    return this.http.post( url, player )
    .map((data: any) => {
      return data;
    });
  }

  getAllPlayers() {
    const url = URL_SERVICIOS + '/players';
    return this.http.get( url );
  }

  getPlayers() {
    const url = URL_SERVICIOS + '/players';
    return this.http.get( url );
  }

  getParticipants () {
    const url = URL_SERVICIOS + '/participants';
    return this.http.get( url );
  }

  setParticipant( participant: Player ) {
    const url = URL_SERVICIOS + '/participant';
    return this.http.post( url, participant )
    .map((data: any) => {
      return data;
    });
  }
}
