import { HostListener, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PostsService } from "./login.service";


@Injectable({ providedIn: "root" })


export class PricingService {

  collection: any = null
  pricingModalOpen: boolean = false
  compareModalOpen: boolean = false
  collectionList: Array<any> = []
  modalContent: any = ''
  currentmodal: any
  currentCollection: any
  uploadObj: any = {
    uploading: false,
    total: 0,
    uploaded: 0,
    fails: 0,
    processed: 0
  }

  

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === ' ') {
      event.preventDefault(); // Prevent the default action for the spacebar
    }
  }

  constructor(private http: HttpClient,    private loginSevice:PostsService
    , private router: Router, private modalService: NgbModal,) {

  }
  OpenModal() {
    // this.pricingModalOpen = !this.pricingModalOpen;

  }
  setModalContent(content: any) {
    console.log({ content });

    this.modalContent = content
    this.currentmodal = this.modalService.open(content, { size: "xl", backdrop: 'static', keyboard: false });
    this.currentmodal.result.then((res:any)=>{
      console.log("sdsssssdsssssssssssssssss");
      this.compareModalOpen = false
      
    }).catch((e:any)=>{
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      this.compareModalOpen = false
      
    })

  }
  setCompareModalContent(content: any) {
    console.log({ content });

    this.modalContent = content
    this.currentmodal = this.modalService.open(content, { size: "xl", backdrop: 'static', keyboard: false });
    this.currentmodal.result.then((res:any)=>{
      console.log("sdsssssdsssssssssssssssss");
      this.pricingModalOpen = false
      
    }).catch((e:any)=>{
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee");
      this.pricingModalOpen = false
      
    })

  }






  getAllCarpet() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });

    return this.http.get(`${environment.URL}/collection/getAll`);

  }

  search(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    return this.http.post(`${environment.URL}/image/search`, data);

  }
  compare(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    return this.http.post(`${environment.URL}/image/compare`, data);

  }
  add(data: any) {
    const headers = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // 'Content-Type': "application/x-www-form-urlencoded",

      "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    return this.http.post(`${environment.URL}/image/add`, data, { headers });


  }
  save_files(url: any, data: any) {
    const headers = new HttpHeaders({
      "Referrer-Policy": "strict-origin-when-cross-origin",
      // 'Content-Type': 'multipart/form-data',
      "Accept": "*/*"
    });
    this.http.put(`${url}`, data, { headers }).subscribe({
      next: (data: any) => {
        console.log("uploaded");

      }, error: (error) => {
        console.log(error);

      }
    })
  }
  addPayment(data:any){
    return this.http.post(`${environment.URL}/payment/add`, data);

  }

  get_put_url(data: any) {
    const headers = new HttpHeaders({
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    return this.http.post(`${environment.URL}/put_presigned_url`, data, { headers });
  }

  get_collections() {
    return this.http.get(`${environment.URL}/collection/getAll`);

  }
  add_collections(data: any) {
    return this.http.post(`${environment.URL}/collection/create`, data);

  }
  get_collection_details(data: any) {
    return this.http.post(`${environment.URL}/collection/get`, data);

  }
  download_image(data: any) {
    return this.http.post(`${environment.URL}/image/getPreSignedUrl`, data);
  }

  setUserDetail(){

    this.get_user_data().subscribe({
      next: (data: any) => {
        console.log(data);
        this.loginSevice.userData = data.user
        if(data.user.membership === 400){
          this.pricingModalOpen = true
        }
        
      }, error: (error) => {
        
        console.log(error);
        
      }
    })
  }
  get_user_data() {
    const headers = new HttpHeaders({
      "Referrer-Policy": "strict-origin-when-cross-origin"
    });

    return this.http.get(`${environment.URL}/user/get`, {
      headers: new HttpHeaders({ Authorization: localStorage.getItem("Token") || "" }),
    });

  }
  makePayment(data: any) {
    return this.http.post(`${environment.URL}/user/payment`, data);

  }

}
