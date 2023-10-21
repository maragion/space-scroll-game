import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceFieldComponent } from './space-field.component';

describe('SpaceFieldComponent', () => {
  let component: SpaceFieldComponent;
  let fixture: ComponentFixture<SpaceFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpaceFieldComponent]
    });
    fixture = TestBed.createComponent(SpaceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
