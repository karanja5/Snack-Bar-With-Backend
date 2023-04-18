import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable({
  providedIn: "root",
})
export class CheckoutAuthenticationGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userService.currentUser.token) {
      return true;
    } else {
      this.router.navigate(["/login"], {
        /* `queryParams: { returnUrl: state.url }` is adding a query parameter to the URL when the user
        is redirected to the login page. The query parameter is named `returnUrl` and its value is
        the URL of the page the user was trying to access before being redirected to the login page.
        This allows the user to be redirected back to the original page after successful login. The
        `state.url` property is used to get the current URL of the page. */
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
  }
}
