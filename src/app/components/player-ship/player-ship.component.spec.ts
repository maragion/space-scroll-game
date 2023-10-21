import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerShipComponent } from './player-ship.component';

describe('PlayerShipComponent', () => {
  let component: PlayerShipComponent;
  let fixture: ComponentFixture<PlayerShipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerShipComponent]
    });
    fixture = TestBed.createComponent(PlayerShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
