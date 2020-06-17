import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapviewTaxistaComponent } from './mapview-taxista.component';

describe('MapviewTaxistaComponent', () => {
  let component: MapviewTaxistaComponent;
  let fixture: ComponentFixture<MapviewTaxistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapviewTaxistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapviewTaxistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
