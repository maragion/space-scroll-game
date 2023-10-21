import {Component, Input} from '@angular/core';
import {PositionService} from "../../services/position/position.service";
import {Coords} from "../../interfaces/coords";

@Component({
  selector: 'app-player-ship',
  templateUrl: './player-ship.component.html',
  styleUrls: ['./player-ship.component.scss']
})
export class PlayerShipComponent {

  coords:Coords | null = null;
  constructor(private position: PositionService) {
  }

  ngOnInit() {
    this.position.$coords.subscribe(data => this.coords = data)
  }

  shoot(event: MouseEvent) {
    console.log("Shoot", this.coords)
  }

}
