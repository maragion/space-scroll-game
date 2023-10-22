import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Coords} from "../../interfaces/coords";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor() { }


  xy: Subject<Coords> = new Subject()
  $coords = this.xy.asObservable()

  shoot: Subject<boolean> = new Subject()
  $action =  this.shoot.asObservable()

}
