import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthComponent } from './auth/auth.component';

const Rutas: Routes = [
    { path: 'login', component: AuthComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot( Rutas, { useHash: true } )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
