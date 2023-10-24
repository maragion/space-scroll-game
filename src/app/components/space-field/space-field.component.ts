import {AfterViewInit, Component} from '@angular/core';
import {PositionService} from "../../services/position/position.service";
import {Coords} from "../../interfaces/coords";
import {Laser} from "../../interfaces/laser";
import {Asteroid} from "../../interfaces/asteroid";
import {filter, from, map, merge} from "rxjs";

@Component({
  selector: 'app-space-field',
  templateUrl: './space-field.component.html',
  styleUrls: ['./space-field.component.scss']
})
export class SpaceFieldComponent implements AfterViewInit {

  constructor(private position: PositionService) {
  }

  lasers: Laser[] = []
  asteroids: Asteroid[] = []
  combined: any = []

  ngAfterViewInit() {
    this.createStars();

    this.position.$asteroidsObs.subscribe((data) => {
      this.asteroids = data;
    });
    this.position.$lasersObs.subscribe((data) => {
      this.lasers = data;
      let las = from(this.lasers);
      let ast = from(this.asteroids)
      let res: any = [];

      this.combined = merge(
        las.pipe(
          map(data => ({type: 'laser', data}))
        ),
        ast.pipe(
          map(data => ({type: 'asteroid', data}))
        )
      ).pipe(
        filter(item => {
          if (item.type === 'laser') {
            const laser: Laser = item.data;
            return this.asteroids.some(asteroid => {
              return (
                parseInt(laser.top) <= (parseInt(asteroid.top) + parseInt(asteroid.height)) &&
                parseInt(laser.top) >= parseInt(asteroid.top) &&
                parseInt(laser.left) >= parseInt(asteroid.left) &&
                parseInt(laser.left)+3 <= (parseInt(asteroid.left) + parseInt(asteroid.width))
              );
            });
          } else if (item.type === 'asteroid') {
            const asteroid: any = item.data;
            return this.lasers.some(laser => {
              return (
                parseInt(laser.top) <= (parseInt(asteroid.top) + parseInt(asteroid.height)) &&
                parseInt(laser.top) >= parseInt(asteroid.top) &&
                parseInt(laser.left) >= parseInt(asteroid.left) &&
                parseInt(laser.left)+3 <= (parseInt(asteroid.left) + parseInt(asteroid.width))
              );
            });
          }
          return false
        })
      ).subscribe(data => {

        res.push(data.data);
      })
      this.position.laserAndAsteroids.next(res)
    });
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

  getCoords(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      this.coords = {
        top: `${event.y + 20}px`,
        left: `${event.x}px`
      }
    }else if (event instanceof TouchEvent) {
      this.coords = {
        top: `${event.touches[0].clientY - 50}px`,
        left: `${event.touches[0].clientX - 60}px`
      }
    }
    this.position.xy.next(this.coords)
  }
}
