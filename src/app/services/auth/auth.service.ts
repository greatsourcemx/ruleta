import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;

  constructor(public http: HttpClient) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.usuario ) ? true : false;
  }

  guardarStorage( usuario: Usuario ) {
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    this.usuario = usuario;
  }

  cargarStorage() {
    if ( localStorage.getItem('usuario') ) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.usuario = null;
    }
  }

  iniciarSesion( usuario: Usuario ) {
    const url = URL_SERVICIOS + '/Auth';

    return this.http.post( url, usuario )
      .map( (user: Usuario) => {
        this.guardarStorage( user );
        return user;
      });
  }

  cerrarSesion() {
    this.usuario = null;
    localStorage.removeItem('usuario');
  }



}
