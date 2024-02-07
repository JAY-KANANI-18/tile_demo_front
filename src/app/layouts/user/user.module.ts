import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { NgxFileDropModule } from 'ngx-file-drop';


@NgModule({
  declarations: [
    UserComponent,
    HomePageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    NgbDropdownModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbCarouselModule,
    NgxFileDropModule
  ]
})
export class UserModule { }
