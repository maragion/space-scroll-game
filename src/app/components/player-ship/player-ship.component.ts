import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PositionService} from "../../services/position/position.service";
import {Coords} from "../../interfaces/coords";

@Component({
  selector: 'app-player-ship',
  templateUrl: './player-ship.component.html',
  styleUrls: ['./player-ship.component.scss']
})
export class PlayerShipComponent implements OnInit, OnChanges{

  @Input() fire: boolean = false

  coords:Coords | null = null;

  coordsForFire:{}[] = []
  constructor(private position: PositionService) {
  }

  ngOnInit() {
    this.position.$coords.subscribe(data => this.coords = data)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['fire'] && changes['fire'].currentValue) {
      this.shoot();
    }
  }

  shoot() {
    if (this.fire) {
      console.log("shoot", this.coords)
      this.coordsForFire.push({top: this.coords?.top, left: this.coords?.left})
      setTimeout(() => {
        this.coordsForFire.shift()
      }, 700)
    }
  }


}
