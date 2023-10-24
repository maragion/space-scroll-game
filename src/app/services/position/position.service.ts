import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Coords} from "../../interfaces/coords";
import {Laser} from "../../interfaces/laser";
import {Asteroid} from "../../interfaces/asteroid";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }


  xy: Subject<Coords> = new Subject()
  $coords = this.xy.asObservable()

  lasers:Subject<Laser[]>= new Subject()
  $lasersObs =  this.lasers.asObservable()

  asteroids: Subject<Asteroid[]> = new Subject()
  $asteroidsObs = this.asteroids.asObservable()


  laserAndAsteroids = new Subject()
  $combined = this.laserAndAsteroids.asObservable()
}
