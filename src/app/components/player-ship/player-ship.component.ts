import {Component, HostListener, OnInit} from '@angular/core';
import {PositionService} from "../../services/position/position.service";
import {Coords} from "../../interfaces/coords";
import {Laser} from "../../interfaces/laser";

@Component({
  selector: 'app-player-ship',
  templateUrl: './player-ship.component.html',
  styleUrls: ['./player-ship.component.scss']
})
export class PlayerShipComponent implements OnInit {

  intervalId: any = null
  coords: Coords = {top: "", left: ""};
  coordsForFire: Laser[] = []

  constructor(private position: PositionService) {
  }

  ngOnInit() {
    this.position.$coords.subscribe(data => this.coords = data);
    this.animateLasers()
  }

  @HostListener('document:mousedown', ['$event'])
  shoot(event: MouseEvent) {
    console.log("shoot", this.coords)
    if (event.button === 0) {
      this.intervalId = setInterval(() => {
        this.coordsForFire.push({top: `${parseInt(this.coords.top) + 60}px`, left: this.coords.left})
      }, 100)
    }
  }

  @HostListener('document:mouseup', ['event'])
  clear() {
    clearInterval(this.intervalId)
  }

  animateLasers() {
    const animate = () => {
      for (let laser of this.coordsForFire) {
        let speed = 15;
        let y: number = parseInt(laser.top, 10);
        laser.top = `${y - speed}px`;
        if (y < 0) {
          this.coordsForFire.findIndex((laser, i) => this.coordsForFire.splice(i, 1))
        }
      }
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

}
