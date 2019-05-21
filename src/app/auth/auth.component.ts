import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: Usuario = new Usuario();
  cargando: boolean;

  constructor(public authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.cerrarSesion();
  }

  ingresar( froma: NgForm ) {
    this.cargando = true;
    this.authService.iniciarSesion( this.user )
      .subscribe((user: Usuario) => {
        this.user = user;
        this.router.navigate(['/home']);
        }, error => {
        this.cargando = false;
        if ( error.status === 401) {
          swal('Aviso!', 'Usuario o contraseña incorrectos', 'warning');
        } else {
          swal('Aviso!', 'Ocurrio un error', 'error');
        }
      });
  }

}
