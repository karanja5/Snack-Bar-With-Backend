import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()
export class TokenAuthenticatorInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Add the token to the request header if the user is logged in.
    const user = this.userService.currentUser;

    if (user.token) {
      request = request.clone({
        setHeaders: {
          access_token: user.token,
        },
      });
    }

    /* `request` is a parameter of the `intercept` method in the
    `TokenAuthenticatorInterceptor` class. It represents the HTTP request being
    intercepted and processed by the interceptor. The interceptor can modify the
    request before it is sent to the server or it can pass it along to the next
    interceptor in the chain by calling `next.handle(request)`. */
    return next.handle(request);
  }
}
