import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiHomeComponent } from './taxi-home.component';

describe('TaxiHomeComponent', () => {
  let component: TaxiHomeComponent;
  let fixture: ComponentFixture<TaxiHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxiHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxiHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
