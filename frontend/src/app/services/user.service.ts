import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../shared/models/User";
import { IUserLogin } from "../shared/Interfaces/IUserLogin";
import { HttpClient } from "@angular/common/http";
import { USER_LOGIN_URL } from "../shared/constants/urls";
import { ToastrService } from "ngx-toastr";

const USER_KEY = "User";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.saveUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Sasini ${user.name}`,
            "You have Logged in Successfully"
          );
        },
        error: (eRes) => {
          this.toastrService.error(eRes.error, "Unsuccessful Login");
        },
      })
    );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private saveUserToLocalStorage = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? (JSON.parse(userJson) as User) : new User();
  }
}
