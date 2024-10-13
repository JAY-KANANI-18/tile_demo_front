import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  constructor(
    private pricingService:PricingService,
    private loginSevice:PostsService
  ) {

    this.pricingService.get_user_data().subscribe({
      next: (data: any) => {
        console.log(data);
        this.loginSevice.userData = data.user
        if(data.user.membership === 400){
            pricingService.pricingModalOpen = true
        }

      }, error: (error) => {

        console.log(error);

      }
    })

  }
}
