import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceAppComponent } from './place-app.component';

describe('PlaceAppComponent', () => {
  let component: PlaceAppComponent;
  let fixture: ComponentFixture<PlaceAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
