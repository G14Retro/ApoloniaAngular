import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSintomasComponent } from './crear-sintomas.component';

describe('CrearSintomasComponent', () => {
  let component: CrearSintomasComponent;
  let fixture: ComponentFixture<CrearSintomasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSintomasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSintomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
