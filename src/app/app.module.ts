import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SpaceFieldComponent } from './components/space-field/space-field.component';
import { PlayerShipComponent } from './components/player-ship/player-ship.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceFieldComponent,
    PlayerShipComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
