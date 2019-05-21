import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/guard/auth.guard';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RouletteComponent } from './roulette/roulette.component';
import { WinnersComponent } from './winners/winners.component';

const Rutas: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'home', component: HomeComponent, data: { modulo: ['Home', 'Inicio'] } },
            { path: 'participants', component: ParticipantsComponent, data: { modulo: ['Participants', 'Participaciones'] } },
            { path: 'roulette', component: RouletteComponent, data: { modulo: ['Roulette', 'Ruleta'] } },
            { path: 'winners', component: WinnersComponent, data: { modulo: ['Winners', 'Ganadores'] } },
            { path: 'players', component: PlayersComponent, data: { modulo: ['Players', 'Jugadores'] } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot( Rutas, { useHash: true } )
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule { }
