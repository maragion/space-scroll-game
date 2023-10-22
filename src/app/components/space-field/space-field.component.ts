import {AfterViewInit, Component,} from '@angular/core';
import {PositionService} from "../../services/position/position.service";
import {Coords} from "../../interfaces/coords";

@Component({
  selector: 'app-space-field',
  templateUrl: './space-field.component.html',
  styleUrls: ['./space-field.component.scss']
})
export class SpaceFieldComponent implements AfterViewInit {

  constructor(private position: PositionService) {
  }

  ngAfterViewInit() {
    this.createStars()
  }

  fallingStars: {}[] = []

  createStars() {
    const numStars = 100;
    let star;
    let size: number;

    for (let i = 0; i < numStars; i++) {
      size = Math.random() * 8;
      star =
        {
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          width: `${size}px`,
          height: `${size}px`,
          background: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
        }
      this.fallingStars[i] = star
    }
  }

  coords: Coords = {
    top: "",
    left: ""
  };

  getCoords(event: MouseEvent) {
    this.coords = {
      top: `${event.y + 20}px`,
      left: `${event.x}px`
    }
    this.position.xy.next(this.coords)
  }
}
