import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxiComponent } from './create-taxi.component';

describe('CreateTaxiComponent', () => {
  let component: CreateTaxiComponent;
  let fixture: ComponentFixture<CreateTaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
