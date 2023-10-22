import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsteroidComponent } from './asteroid.component';

describe('AsteroidComponent', () => {
  let component: AsteroidComponent;
  let fixture: ComponentFixture<AsteroidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsteroidComponent]
    });
    fixture = TestBed.createComponent(AsteroidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
