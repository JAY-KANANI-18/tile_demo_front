import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "src/app/environments/environment";

@Injectable({ providedIn: "root" })
export class PricingService {
  zone: any;
  constructor(private http: HttpClient, private router: Router) {}

  addVehicle(data: any) {
    return this.http.post(`${environment.URL}/Pricing/VehicleType`, data);
  }



  updateVehicle(id: any) {
    return this.http.get(`${environment.URL}/Pricing/Vehicles/Update?id=${id}`);
  }

  saveVehicle(data: any, id: any) {
    return this.http.post(
      `${environment.URL}/Pricing/Vehicles/Update/save/${id}`,
      data
    );
  }
  getCountry() {
    return this.http.get(`${environment.URL}/Country`);
  }
  
  getAllCarpet(){
    return this.http.get(`${environment.URL}/carpets`);

  }

  search(data:any){
    return this.http.post(`${environment.URL}/test`,data);

  }
  add(data:any){
    return this.http.post(`${environment.URL}/add_carpet`,data);


  }

}
