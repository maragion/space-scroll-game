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
      this.removeLaser()
    })
  }

  id: number = 0

  @HostListener('document:mousedown', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  shoot(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      if (event.button === 0) {
        this.intervalId = setInterval(() => {

          this.coordsForFire.push({
            type: 'las',
            id: this.id++,
            top: `${parseInt(this.coords.top)}px`,
            left: `${parseInt(this.coords.left) + 50}px`
          })
        }, 100)
      }
    }else if (event instanceof TouchEvent) {
      this.intervalId = setInterval(() => {

        this.coordsForFire.push({
          type: 'las',
          id: this.id++,
          top: `${parseInt(this.coords.top)}px`,
          left: `${parseInt(this.coords.left) + 50}px`
        })

      }, 100)
    }
  }

  @HostListener('document:mouseup', ['event'])
  @HostListener('document:touchend', ['event'])

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

  removeLaser() {
    if (this.toRemove) {
      this.toRemove.forEach((value: Laser) => {
        let id = value.id;
        this.coordsForFire = this.coordsForFire.filter(las => las.id != id)
      })
    }
  }

}
