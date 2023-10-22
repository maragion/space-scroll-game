import {Component, OnInit} from '@angular/core';
import {Asteroid} from "../../interfaces/asteroid";

@Component({
  selector: 'app-asteroid',
  templateUrl: './asteroid.component.html',
  styleUrls: ['./asteroid.component.scss']
})
export class AsteroidComponent implements OnInit {

  asteroids: Asteroid[] = []

  ngOnInit() {
    this.generateAsteroids()
    this.animateAsteroids()
  }


  positionX: number | null = null;
  positionY: number | null = null;

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

  animateAsteroids() {
    const animate = () => {
      for (let asteroid of this.asteroids) {
        let speed = Math.random() * 10
        let y: number = Math.round(Number(asteroid.top.replace(/[^0-9.]/g, '')))
        let x: number = Math.round(Number(asteroid.left.replace(/[^0-9.]/g, '')))

        asteroid.top = `${y + speed}px`;
        asteroid.left = `${x + speed}px`;

        if (y > window.innerHeight || x > window.innerWidth) {
          this.asteroids.findIndex((asteroid, i) => this.asteroids.splice(i, 1))
        }
      }
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
