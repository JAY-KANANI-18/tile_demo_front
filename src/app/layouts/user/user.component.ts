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
    private pricingService: PricingService,
    private loginSevice: PostsService
  ) {
    pricingService.setUserDetail()
    loginSevice.updateCollection({isUploading:false}).subscribe()



  }
}
