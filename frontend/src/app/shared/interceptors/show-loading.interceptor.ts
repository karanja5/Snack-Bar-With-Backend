/* The ShowLoadingInterceptor class is an Angular HTTP interceptor that shows and hides a loading
screen while HTTP requests are being made. */
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { LoadingService } from "src/app/services/loading.service";

var pendingRequests: number = 0;

@Injectable()
export class ShowLoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  /**
   * This function intercepts HTTP requests and shows a loading screen while waiting for the response,
   * then hides it when the response is received or an error occurs.
   * @param request - The HTTP request that needs to be intercepted and handled.
   * @param {HttpHandler} next - HttpHandler is an interface that represents the next interceptor or
   * the backend server that will handle the HTTP request. It provides a handle() method that returns
   * an Observable of HttpEvents.
   * @returns An observable of type `Observable<HttpEvent<unknown>>` is being returned.
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.showLoadingScreen();
    pendingRequests++;

    /* The `return next.handle(request).pipe(...)` statement is chaining the HTTP request handling
    process with a `tap` operator. The `tap` operator allows us to perform side effects on the
    observable sequence without modifying the values emitted by the sequence. */
    return next.handle(request).pipe(
      tap({
        next: (httpEvent) => {
          if (httpEvent.type === HttpEventType.Response) {
            this.loadingService.hideLoadingScreen();
          }
        },
        /* In the context of this code, `_` is a placeholder variable that is used to indicate
        that we are not interested in the value of the error parameter passed to the error
        callback function. It is a convention in TypeScript to use `_` as a variable name
        when we want to ignore a parameter. */
        error: (_) => {
          this.handleHideLoadingScreen();
        },
      })
    );
  }

  /**
   * This function decreases the count of pending requests and hides the loading screen if there are no
   * more pending requests.
   */
  handleHideLoadingScreen() {
    pendingRequests--;
    if (pendingRequests === 0) {
      this.loadingService.hideLoadingScreen();
    }
  }
}
