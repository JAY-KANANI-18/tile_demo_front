import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';
import { PricingService } from 'src/app/services/pricing.servive';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userData: any = {}
  constructor(
    public loginSevice: PostsService,
    private pricingService: PricingService,

  ) {
    this.get_user()
  }
  logOut() {
    this.loginSevice.logOut()
  }
  async get_user() {
    this.pricingService.get_user_data().subscribe({
      next: (data: any) => {
        console.log(data);
        this.userData = data.user

      }, error: (error) => {

        console.log(error);

      }
    })
  }
  openModal() {
    this.pricingService.pricingModalOpen = true
  }
  getDaycount(membershipEndAt: Date, membershipStartAt: Date) {
    return Math.floor(
      (new Date(membershipEndAt).getTime() - new Date(membershipStartAt).getTime())
      / (1000 * 3600 * 24)
    );
  }
}
