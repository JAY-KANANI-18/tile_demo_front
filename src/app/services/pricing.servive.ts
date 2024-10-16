import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { subscribeOn } from "rxjs";

@Injectable({ providedIn: "root" })
export class PricingService {
  zone: any;
  collection :any = null

  constructor(private http: HttpClient, private router: Router) { }

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

  getAllCarpet() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });

    return this.http.get(`${environment.URL}/carpets`);

  }

  search(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    return this.http.post(`${environment.URL}/test`, data);

  }
  add(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    return this.http.post(`${environment.URL}/add_carpet`, data, { headers });


  }
  save_files(url: any, data: any) {
    const headers = new HttpHeaders({
      "Referrer-Policy": "strict-origin-when-cross-origin",
      // 'Content-Type': 'multipart/form-data',
      "Accept":"*/*"
    });
    this.http.put(`${url}`, data,{headers}).subscribe({
      next: (data: any) => {
        console.log("uploaded");

      }, error: (error) => {
        console.log(error);

      }
    })
  }
  
  get_put_url(data: any) {
    const headers = new HttpHeaders({
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    return this.http.post(`${environment.URL}/put_presigned_url`, data, { headers });
  }

  get_collections(data:any){
    return this.http.post(`${environment.URL}/collections`, data, );

  }
  add_collections(data:any){
    return this.http.post(`${environment.URL}/collections/create`, data );

  }
  get_collection_details(data:any){
    return this.http.post(`${environment.URL}/collections/details` ,data);

  }
  download_image(data:any){
    return this.http.post(`${environment.URL}/get_presigned_url` ,data);
  }

}
