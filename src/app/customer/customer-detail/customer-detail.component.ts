import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { City } from "src/app/model/city";
import { CustomerService } from "src/app/services/customer.service";
import { Observable } from "rxjs/internal/Observable";
import { Customer } from "src/app/model/customer";
import { ResourceLoader } from "@angular/compiler";

@Component({
  selector: "app-customer-detail",
  templateUrl: "./customer-detail.component.html",
  styleUrls: ["./customer-detail.component.scss"],
})
export class CustomerDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private customerService: CustomerService
  ) {}

  customerForm: FormGroup;
  isCreateMode: boolean;
  cities$: Observable<City[]>;
  updateCustomerId: string;
  dbCustomer: Customer;

  ngOnInit(): void {
    this.getCities();
    this.createForm();
    this.checkMode();
  }

  private checkMode() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.updateCustomerId = params.get("id");
      if (this.updateCustomerId) {
        this.isCreateMode = false;
        this.setFormValues();
      } else this.isCreateMode = true;
    });
  }

  private createForm() {
    this.customerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      contactPerson: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      city: new FormControl("", [Validators.required]),
      employeeCount: new FormControl("", [Validators.required]),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.customerForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this._location.back();
  };

  public onSave = (formValue) => {
    if (this.customerForm.valid) {
      if (this.isCreateMode) this.createCustomer(formValue);
      else this.updateCustomer(formValue);
    }
  };

  private updateCustomer(formValue: any) {
    const updateCustomer: Customer = {
      name: formValue.name,
      contactPerson: formValue.contactPerson,
      phone: formValue.phone,
      location: formValue.city,
      employeeCount: formValue.employeeCount,
    };
    this.customerService
      .updateCustomer(this.updateCustomerId, updateCustomer)
      .then((response) => {
        this._location.back();
      });
  }

  private createCustomer(formValue: any) {
    if (this.isCreateMode) {
      const currentCustomer: Customer = {
        name: formValue.name,
        contactPerson: formValue.contactPerson,
        phone: formValue.phone,
        location: formValue.city,
        employeeCount: formValue.employeeCount,
      };

      this.customerService.createCustomer(currentCustomer).then((response) => {
        //show message successfuly or not
        this._location.back();
      });
    }
  }

  setFormValues() {
    if (this.isCreateMode || !this.customerService.customerList$) return;

    this.customerService.customerList$.subscribe((customers) => {
      this.dbCustomer = customers.filter(
        (c) => c.id === this.updateCustomerId
      )[0];
      if (this.dbCustomer) {
        this.customerForm.controls["name"].setValue(this.dbCustomer.name);
        this.customerForm.controls["contactPerson"].setValue(
          this.dbCustomer.contactPerson
        );
        this.customerForm.controls["phone"].setValue(this.dbCustomer.phone);
        this.customerForm.controls["city"].setValue(this.dbCustomer.location);
        this.customerForm.controls["employeeCount"].setValue(
          this.dbCustomer.employeeCount
        );
      }
    });
  }

  private getCities() {
    this.cities$ = this.customerService.getCities();
  }
}
