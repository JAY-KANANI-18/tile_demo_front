import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userData:any = {}
  constructor(
    private loginSevice: PostsService,
    private pricingService: PricingService,

  ) { 
    this.get_user()
  }
  logOut() {
    this.loginSevice.logOut()
  }
  async get_user(){
    this.pricingService.get_user_data().subscribe({
      next:(data:any)=>{
        console.log(data);
        this.userData = data.user

      },error:(error)=>{

        console.log(error);
        
      }
    })
  }
}
