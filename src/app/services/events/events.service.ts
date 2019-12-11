import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Evento } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(public http: HttpClient) { }

  loadEvent() {
    const url = URL_SERVICIOS + '/events';
    return this.http.get( url );
  }

  saveWinner( evento: Evento ) {
    const url = URL_SERVICIOS + '/event/winners';
    return this.http.post( url, evento )
    .map((data: Evento) => {
      return data;
    });
  }

  changeWinner( evento: Evento ) {
    const url = URL_SERVICIOS + '/event/winners';
    return this.http.put( url, evento )
    .map((data: Evento) => {
      return data;
    });
  }

  loadWinners() {
    const url = URL_SERVICIOS + '/event/winners';
    return this.http.get( url );
  }
}
