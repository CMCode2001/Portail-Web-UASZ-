import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartenairesComponent } from './list-partenaires.component';

describe('ListPartenairesComponent', () => {
  let component: ListPartenairesComponent;
  let fixture: ComponentFixture<ListPartenairesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartenairesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartenairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
