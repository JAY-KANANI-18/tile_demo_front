import { Component } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { PostsService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  error2: any = ''
    token:any = ''

  constructor(private loginService: PostsService,private route:ActivatedRoute ,private router:Router
  ) { 
    this.route.params.subscribe(params => {
      this.token  = params['token'];
      
      // Perform actions using the userId (e.g., fetch user details)
    });

  }
  submit(pass:any,cpass:any):any{
    console.log(pass,cpass);

    
    if((pass !== cpass )|| (!pass )|| (!cpass)){
      console.log('true');
      
        return this.error2 = "Password didn't match"
    }

    this.loginService.resetPassword({
      token:this.token , 
      password:pass,
      
    }).subscribe({
      next:(data:any)=>{
        if(data.status ){
           this.router.navigate(["/login"])
        }
        console.log(data);
        
      },error:(error)=>{
        console.log(error);
        
      }
    })
    

  }
}
