import {Component, OnInit} from '@angular/core';
import {Asteroid} from "../../interfaces/asteroid";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit {

  asteroids: Asteroid[] = []
  lastTimestamp: number = 0;

  ngOnInit() {
    this.generateAsteroids()
    this.animateAsteroids(0)
  }

  async generateAsteroids() {
    const numAster = 50;
    this.asteroids = [];

    for (let i = 0; i < numAster; i++) {
      const time = Math.random() * 10000;
      const size = Math.random() * 100;

      await this.delay(time);

      const asteroid: Asteroid = {
        left: `${Math.random() * 100}px`,
        width: `${size}px`,
        height: `${size}px`,
        top: `${-size}px`
      };
      this.asteroids.push(asteroid);
    }
  }

  animateAsteroids(timestamp: number) {

    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }

    const deltaTime = timestamp - this.lastTimestamp;
    for (let asteroid of this.asteroids) {
      let speed = Math.random() * deltaTime
      let y: number = parseInt(asteroid.top, 10)
      let x: number = parseInt(asteroid.left, 10)

      asteroid.top = `${y + speed}px`;
      asteroid.left = `${x + speed}px`;

      if (y > window.innerHeight || x > window.innerWidth) {
        this.asteroids.findIndex((asteroid, i) => this.asteroids.splice(i, 1))
      }
    }
    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.animateAsteroids.bind(this));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
