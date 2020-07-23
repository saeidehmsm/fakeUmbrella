import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerForecast5DetailComponent } from './customer-forecast5-detail.component';

describe('CustomerForecast5DetailComponent', () => {
  let component: CustomerForecast5DetailComponent;
  let fixture: ComponentFixture<CustomerForecast5DetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerForecast5DetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerForecast5DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
