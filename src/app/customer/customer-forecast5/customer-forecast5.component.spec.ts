import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForecast5Component } from './customer-forecast5.component';

describe('CustomerForecast5Component', () => {
  let component: CustomerForecast5Component;
  let fixture: ComponentFixture<CustomerForecast5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerForecast5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerForecast5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
