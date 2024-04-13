import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositionsDirectionsComponent } from './compositions-directions.component';

describe('CompositionsDirectionsComponent', () => {
  let component: CompositionsDirectionsComponent;
  let fixture: ComponentFixture<CompositionsDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositionsDirectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompositionsDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
