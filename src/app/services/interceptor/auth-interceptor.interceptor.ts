import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, finalize, of, tap, throwError } from "rxjs";
import { LoadingServiceService } from "../loading-service.service";
import { PostsService } from "../login.service";
import { PricingService } from "../pricing.servive";
// import { PostsService } from "../login.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingServiceService,
    private loginService: PostsService,
    private pricingService: PricingService,
    private toster: ToastrService,
    
    
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('inter called');
    let localtoken = localStorage.getItem("Token") || "";
    // this.loginService.autoLogout();

    // request = request.clone({headers:request.headers.set('Authorization',localStorage.getItem('newToken'))})
    if (request.url.includes("fcm.googleapis.com/fcm/send")) {
      return next.handle(request);
    }else{
      this.loadingService.showLoading();

    }
    
    request =  request.clone({
      headers: request.headers.set("token", localtoken),
      // withCredentials: true
    });
    console.log({request});
    

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          console.log({event});
          // this.toster.success("success")
        //         // this.toster.success(data.msg)

          if(event.body.STATUS_CODE == 100){
            this.pricingService.pricingModalOpen = true
          }
          
        }
      }),
      catchError((error:any) => {
        console.log(error);
        if (error.status === 401) {
          console.log("time to logout");
           this.loginService.logOut()
          
          // this.toster.error('session complete')
        }
         this.toster.error(error.error.msg)


        throw error;
      }),
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
