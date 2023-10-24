import {Component, OnInit} from '@angular/core';
import {Asteroid} from "../../interfaces/asteroid";
import {PositionService} from "../../services/position/position.service";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit {

  constructor(private position: PositionService) {
  }

  asteroids: Asteroid[] = []
  toRemove: any = []

  ngOnInit() {
    this.position.$combined.subscribe(data => {
      this.toRemove = data;
      this.removeAsteroid()
    })
    this.generateAsteroids()
    this.animateAsteroids()

  }

  async generateAsteroids() {
    const numAster = 50;
    this.asteroids = [];

    for (let i = 0; i < numAster; i++) {
      const time = Math.random() * 5000;
      let size = Math.random() * 100;
      while (size < 30) {
        size = Math.random() * 100;
      }
      if (i === 49) {
        i = 0
      }

      await this.delay(time);

      const asteroid: Asteroid = {
        type: "ast",
        id: i,
        left: `${Math.random() * 100}px`,
        width: `${size}px`,
        height: `${size}px`,
        top: `${-size}px`
      };
      this.asteroids.push(asteroid);
    }
  }

  removeAsteroid() {
    if (this.toRemove) {
      this.toRemove.forEach((value: any) => {

        let id = value.id
        this.asteroids = this.asteroids.filter(ast =>
          ast.id !== id
        )
      })
    }
  }

  animateAsteroids() {
    for (let asteroid of this.asteroids) {
      let speed = 1
      let y: number = parseInt(asteroid.top, 10)
      let x: number = parseInt(asteroid.left, 10)

      asteroid.top = `${y + speed}px`;
      asteroid.left = `${x + speed}px`;
      if (y > window.innerHeight || x > window.innerWidth) {
        this.asteroids.findIndex((asteroid, i) => this.asteroids.splice(i, 1))
      }
    }
    this.position.asteroids.next(this.asteroids)
    requestAnimationFrame(this.animateAsteroids.bind(this));
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
