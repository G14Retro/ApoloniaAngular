import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDispoComponent } from './tabla-dispo.component';

describe('TablaDispoComponent', () => {
  let component: TablaDispoComponent;
  let fixture: ComponentFixture<TablaDispoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaDispoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDispoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
