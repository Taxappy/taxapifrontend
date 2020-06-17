import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialTaxistaComponent } from './historial-taxista.component';

describe('HistorialTaxistaComponent', () => {
  let component: HistorialTaxistaComponent;
  let fixture: ComponentFixture<HistorialTaxistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialTaxistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialTaxistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
