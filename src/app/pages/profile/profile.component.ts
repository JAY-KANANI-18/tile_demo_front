import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    private loginSevice: PostsService,

  ) { }
  logOut() {
    this.loginSevice.logOut()
  }
}
