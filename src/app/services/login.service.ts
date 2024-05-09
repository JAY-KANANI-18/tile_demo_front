import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaders,

} from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
// import { AES } from "crypto-js";
// import { CookieService } from "ngx-cookie-service";
// import * as CryptoJS from "crypto-js";
// import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";

// import { Post } from './post.model';

@Injectable({ providedIn: "root" })
export class PostsService {
    private encryptionKey = "user123";

    userData: any = localStorage.getItem("User")

    error = new Subject<string>();

    constructor(
        private http: HttpClient,
        private router: Router,
        // private cookieService: CookieService,
        // private toster: ToastrService
    ) { }
    logginToken: any = false;

    createAndStorePost(data: any) {
        const Data: any = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        return this.http.post(`${environment.URL}/login`, Data);
    }

    logOut() {
        this.logginToken = null;

        const token = localStorage.getItem("Token");
        // const user = localStorage.getItem("User");

        const dtoken = localStorage.removeItem("Token");
        // const duser = localStorage.removeItem("User");

        this.router.navigate(["./login"]);
        this.http.post(`${environment.URL}/logout`, { token}).subscribe({
            next: (data: any) => {
                // this.toster.success(data.msg)
                localStorage.setItem("newToken", '');
                localStorage.setItem("User", '');
                this.userData = ''
            }, error: (error) => {
                console.log(error);
                // this.toster.error(error.error.msg)
            }
        });

    }

    login(data: any) {
        const Data: any = { email: data.email, password: data.password };

        return this.http.post(`${environment.URL}/login`, Data);
    }
    signUp(data: any) {
        const Data: any = { email: data.email, password: data.password };

        return this.http.post(`${environment.URL}/signup`, Data);
    }
    //   autoLogout() {
    //     let encryptedData = this.cookieService.get("myEncryptedData");
    //     if (encryptedData) {
    //       const decryptedData = AES.decrypt(
    //         encryptedData,
    //         this.encryptionKey
    //       ).toString(CryptoJS.enc.Utf8);

    //       if ((new Date().getTime() - +decryptedData) / 1000 > 10 * 60 ) {
    //         console.log("time to log out");

    //         this.logOut();
    //       }
    //     }
    //     const data = new Date().getTime().toString();
    //     encryptedData = AES.encrypt(data, this.encryptionKey).toString();
    //     this.cookieService.set("myEncryptedData", encryptedData);
    //   }

    isAuthenticated() {
        const promise = new Promise((resolve, reject) => {
            const token = localStorage.getItem("Token") || "";
            if (!token) this.logOut();
            this.http
                .get(`${environment.URL}/auth`, {
                    headers: new HttpHeaders({ Authorization: token }),
                })
                .subscribe({
                    next: (data: any) => {
                        if (data.status == true) {
                            this.logginToken = true;
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    },
                    error: (error) => {
                        console.log(error);
                        this.logginToken = false;
                        this.logOut();
                    },
                });

            //   (data)=>{

            // })

            //   resolve(this.logginToken);
        });
        return promise;
    }   


}
