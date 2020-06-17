import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTaxiComponent } from './list-taxi.component';

describe('ListTaxiComponent', () => {
  let component: ListTaxiComponent;
  let fixture: ComponentFixture<ListTaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
