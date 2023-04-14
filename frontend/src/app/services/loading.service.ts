/* The LoadingService class provides methods to show and hide a loading screen and an observable to
check if the loading screen is currently displayed. */
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  showLoadingScreen() {
    this.isLoadingSubject.next(true);
  }

  hideLoadingScreen() {
    this.isLoadingSubject.next(false);
  }

  get isLoading() {
    return this.isLoadingSubject.asObservable();
  }
}
