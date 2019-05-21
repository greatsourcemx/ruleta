import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class GiftsService {

  constructor(public http: HttpClient) { }

  loadGifts() {
    const url = URL_SERVICIOS + '/gifts';
    return this.http.get( url );
  }
}
