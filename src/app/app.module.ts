import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

import { RouterModule } from '@angular/router';

import { NgxFileDropModule } from 'ngx-file-drop';
import { AuthInterceptorInterceptor } from './services/interceptor/auth-interceptor.interceptor';
// 
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

const config: SocketIoConfig = { url: environment.Socket, options: {
  transports: ['websocket', 'polling']
}  };
@NgModule({
  declarations: [
    AppComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    NgbDropdownModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbCarouselModule,
    NgxFileDropModule,
    ToastrModule.forRoot({
      timeOut: 3000, // Example of configuring ToastrModule
      positionClass: '*',
      preventDuplicates: true,
    }),
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),


    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,        useClass:AuthInterceptorInterceptor,
    multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
