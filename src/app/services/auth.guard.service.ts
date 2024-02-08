import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { PostsService } from "./login.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private postService: PostsService) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let res = await this.postService.isAuthenticated()
    console.log(res);
    
    if (res) {
      // this.router.navigate(['home'])

      return true

    } else {
      this.router.navigate(['/login'])
      return false

    }

  }

}
