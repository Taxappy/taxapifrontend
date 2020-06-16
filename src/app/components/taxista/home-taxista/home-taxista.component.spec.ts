import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTaxistaComponent } from './home-taxista.component';

describe('HomeTaxistaComponent', () => {
  let component: HomeTaxistaComponent;
  let fixture: ComponentFixture<HomeTaxistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTaxistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTaxistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
