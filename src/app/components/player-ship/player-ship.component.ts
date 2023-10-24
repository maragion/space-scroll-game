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
  toRemove: any = []

  constructor(private position: PositionService) {
  }

  ngOnInit() {
    this.position.$coords.subscribe(data => this.coords = data);
    this.animateLasers()
    this.position.$combined.subscribe(data => {
      this.toRemove = data;
      this.laserRemove()
    })
  }

  @HostListener('document:mousedown', ['$event'])
  shoot(event: MouseEvent) {
    if (event.button === 0) {
      this.intervalId = setInterval(() => {
        this.coordsForFire.push({
          type: 'las',
          top: `${parseInt(this.coords.top)}px`,
          left: `${parseInt(this.coords.left) + 50}px`
        })
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
        let speed = 10;
        let y: number = parseInt(laser.top, 10);
        laser.top = `${y - speed}px`;
        if (y < 0) {
          this.coordsForFire.findIndex((laser, i) => this.coordsForFire.splice(i, 1))
        }
      }
      requestAnimationFrame(animate);
      this.position.lasers.next(this.coordsForFire)
    }
    requestAnimationFrame(animate);
  }

  laserRemove() {
    if (this.toRemove) {
      this.toRemove.forEach((value: any) => {
        if (value.type === "las") {
          this.coordsForFire.findIndex((value, i) => this.coordsForFire.splice(i, 1));
        }
      })
    }
  }

}
