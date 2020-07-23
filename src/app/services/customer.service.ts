import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore } from "@angular/fire/firestore";
import { map, flatMap } from "rxjs/operators";
import { Observable } from "rxjs/internal/Observable";
import * as _ from "lodash";

import { Customer } from "../model/customer";
import { City } from "../model/city";
import Config from "src/config";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}
  customerList$: Observable<Customer[]>;
  apikey = Config.apiKey;
  Weather = "Rain"; // should change to Rain

  getAllCustomer() {
    if (this.customerList$) return this.customerList$;

    this.customerList$ = this.firestore
      .collection<Customer>("customer")
      .snapshotChanges()
      .pipe(
        map((docArray) => {
          return docArray.map((doc) => {
            const id = doc.payload.doc.id;
            const data = doc.payload.doc.data();
            return { id, ...data } as Customer;
          });
        })
      );

    return this.customerList$;
  }

  createCustomer(customer: Customer) {
    return this.firestore.collection<Customer>("customer").add(customer);
  }

  updateCustomer(customerKey: string, customer: Customer) {
    return this.firestore.collection("customer").doc(customerKey).set(customer);
  }

  deleteCustomer(customerKey: string) {
    return this.firestore.collection("customer").doc(customerKey).delete();
  }

  getCities() {
    return this.firestore.collection<City>("city").valueChanges();
  }

  getcustomerCities() {
    return this.getAllCustomer().pipe(
      map((customers: Customer[]) => {
        const allCustomers = customers;
        const groupedCustomers = _.groupBy(customers, (c) => c.location);
        const cities = Object.keys(groupedCustomers);
        return cities;
      })
    );
  }

  getRainyCustomers() {
    let rainiyDates = [];
    let finalResult = [];
    let observableBatch = [];
    return this.getAllCustomer().pipe(
      flatMap((customers: Customer[]) => {
        const groupedCustomers = _.groupBy(customers, (c) => c.location);
        const cities = Object.keys(groupedCustomers);

        for (const cityId of cities) {
          let result = this.http.get(
            //"assets/data/dummy-weather.json"  *** test***
            `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${this.apikey}`
          );
          observableBatch.push(result);
        }

        return forkJoin(observableBatch).pipe(
          map((forecast5Result: any) => {
            for (const forecast5Weather of forecast5Result) {
              for (const item of forecast5Weather.list) {
                for (const weather of item.weather) {
                  if (weather.main == this.Weather) {
                    const dateTime = item.dt_txt.split(" ");
                    rainiyDates.push({
                      rainyDate: dateTime[0],
                      rainyTime: dateTime[1],
                      cityId: +forecast5Weather.city.id,
                      city: forecast5Weather.city.name,
                    });
                  }
                }
              }
              if (rainiyDates && rainiyDates.length > 0) {
                const filteredCustomers = customers.filter(
                  (c) => +c.location === +rainiyDates[0].cityId
                );
                for (const rainyCustomer of filteredCustomers) {
                  finalResult.push({
                    name: rainyCustomer.name,
                    contact: rainyCustomer.contactPerson,
                    phone: rainyCustomer.phone,
                    city: rainiyDates[0].city,
                    rainyDateTime: rainiyDates,
                  });
                }
                rainiyDates = [];
              }
            }
            return finalResult;
          })
        );
      })
    );
  }

  getTop4Customers() {
    let top4Customers: Customer[];
    let finalResult = [];
    let observableBatch = [];
    return this.getAllCustomer().pipe(
      flatMap((customers: Customer[]) => {
        const orderedCustomer = _.orderBy(
          customers,
          ["employeeCount"],
          ["desc"]
        );
        top4Customers = orderedCustomer.slice(0, 4);

        for (const customer of top4Customers) {
          let result = this.http.get(
            // "assets/data/dummy-weather.json"  *** test***
            `http://api.openweathermap.org/data/2.5/forecast?id=${customer.location}&appid=${this.apikey}`
          );
          observableBatch.push(result);
        }
        return forkJoin(observableBatch).pipe(
          map((result: any[]) => {
            for (const customer of top4Customers) {
              const index = result.findIndex(
                (c) => +c.city.id == +customer.location
              );
              if (index >= 0) {
                finalResult.push({
                  customerName: customer.name,
                  employeeCount: customer.employeeCount,
                  isRainy: this.isRainy(result[index]),
                });
              }
            }
            return finalResult;
          })
        );
      })
    );
  }

  private isRainy(result: any) {
    for (const item of result.list) {
      for (const weather of item.weather) {
        if (weather.main == this.Weather) {
          return true;
        }
      }
    }
    return false;
  }
}
