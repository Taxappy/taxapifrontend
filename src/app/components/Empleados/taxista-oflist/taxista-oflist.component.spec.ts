import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxistaOFListComponent } from './taxista-oflist.component';

describe('TaxistaOFListComponent', () => {
  let component: TaxistaOFListComponent;
  let fixture: ComponentFixture<TaxistaOFListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxistaOFListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxistaOFListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
