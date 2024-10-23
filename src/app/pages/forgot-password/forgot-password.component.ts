import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  error2: any = ''
    constructor(public loginService: PostsService
    ) { }


  sendEmail():any {

    console.log("senddd");

    let email = document.getElementById("email") as HTMLInputElement
    if (!email.value) {
      return this.error2 = "Enter Valid Email"
    }
    this.loginService.forgot_password({ email :email.value}).subscribe({
      next: (data: any) => {
        console.log(data);
        if(data.status){
            alert("email sent sucessfully")
        }

      }, error: (error) => {
        console.log(error);

      }
    })
  }
}
