import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Rutas
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RouletteComponent } from './roulette/roulette.component';
import { WinnersComponent } from './winners/winners.component';

@NgModule({
  declarations: [
    HomeComponent,
    PlayersComponent,
    ParticipantsComponent,
    RouletteComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class PagesModule { }
