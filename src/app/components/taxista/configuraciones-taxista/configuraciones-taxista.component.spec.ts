import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionesTaxistaComponent } from './configuraciones-taxista.component';

describe('ConfiguracionesTaxistaComponent', () => {
  let component: ConfiguracionesTaxistaComponent;
  let fixture: ComponentFixture<ConfiguracionesTaxistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionesTaxistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionesTaxistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
