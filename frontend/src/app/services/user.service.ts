/*The UserService class provides methods for user authentication and manages user data using local
storage.
`Injectable` is a decorator in Angular that marks a class as a dependency that can be injected 
into other classes. It allows the class to be registered with the Angular injector so that it 
can be provided as a dependency to other classes that require it. In this case, the `UserService` 
class is marked as `@Injectable` so that it can be injected into other components or services that 
require user authentication and management functionality.
-`BehaviorSubject` is a type of `Subject` in RxJS that emits the most recent value to its subscribers 
upon subscription and then continues to emit any subsequent values. In the `UserService` class, a 
`BehaviorSubject` is used to keep track of the current user by emitting the user object to any 
subscribers upon subscription and whenever the user object is updated. This allows other components 
or services that depend on the current user to always have access to the most up-to-date user information.
-`Observable` is a class in RxJS that represents a stream of data that can be observed over time. 
In the `UserService` class, the `userObservable` property is of type `Observable<User>`, which means 
that it emits a stream of `User` objects.Other components or services can subscribe to this observable 
to receive updates whenever the current user changes. The `tap` operator is used to perform side effects 
on the observable stream, such as saving the user to local storage or displaying a success/error message.
-`tap` is an operator in RxJS that allows you to perform side effects on an observable stream without 
modifying the stream itself. In the `UserService` class, `tap` is used to save the user to local storage 
and display a success/error message when the user logs in. It is called with an object that contains
two properties: `next` and `error`. `next` is a function that is called when the observable emits 
a new value, and `error` is a function that is called when the observable emits an error. By using `tap`, 
the `login` method can perform these side effects without modifying the observable stream itself */
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { User } from "../shared/models/User";
import { IUserLogin } from "../shared/Interfaces/IUserLogin";
import { HttpClient } from "@angular/common/http";
import { USER_LOGIN_URL } from "../shared/constants/urls";
import { ToastrService } from "ngx-toastr";

/* `const USER_KEY = "User";` is declaring a constant variable `USER_KEY` and assigning it the value
`"User"`. This constant is used as a key to store and retrieve the user object from local storage.
When the user logs in, their user object is saved to local storage with the key `"User"`, and when
the user logs out, the user object is removed from local storage using the same key. This allows the
`UserService` to persist the user's login state across page refreshes or browser sessions. */
const USER_KEY = "User";

@Injectable({
  providedIn: "root",
})
/* The UserService class handles user authentication and stores user information in local storage. */
export class UserService {
  /* `private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());` is creating a
  new instance of the `BehaviorSubject` class with an initial value of the user object retrieved
  from local storage using the `getUserFromLocalStorage()` method. The `BehaviorSubject` is used to
  keep track of the current user by emitting the user object to any subscribers upon subscription
  and whenever the user object is updated. This allows other components or services that depend on
  the current user to always have access to the most up-to-date user information. */
  private userSubject = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  /* `public userObservable: Observable<User>;` is declaring a public property `userObservable` of type
  `Observable<User>` in the `UserService` class. This property is used to expose the
  `BehaviorSubject` as an observable to other components or services that need to subscribe to
  changes in the current user. By making it public, other components or services can access this
  property and subscribe to the observable stream to receive updates whenever the current user
  changes. */
  public userObservable: Observable<User>;

  /**
   * This is a constructor function that initializes a userObservable property with an observable
   * created from a userSubject and takes in HttpClient and ToastrService as parameters.
   * @param {HttpClient} http - `http` is an instance of the `HttpClient` class which is used to make
   * HTTP requests to a server. It allows you to send HTTP requests and receive HTTP responses from a
   * server using various HTTP methods such as GET, POST, PUT, DELETE, etc.
   * @param {ToastrService} toastrService - ToastrService is a service provided by the Toastr library
   * for Angular, which is used to display toast notifications in the application. It provides methods
   * to show success, error, warning, and info messages to the user in a non-intrusive way. The
   * constructor is injecting this service as a dependency to
   */
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  /**
   * This function logs in a user by sending a post request to a login URL and returns an observable of
   * the user, while also saving the user to local storage and displaying a success or error message
   * using ToastrService.
   * @param {IUserLogin} userLogin - an object of type IUserLogin which contains the user's login
   * credentials such as email and password.
   * @returns The `login` method is returning an Observable of type `User`.
   */
  login(userLogin: IUserLogin): Observable<User> {
    /*`.pipe` is a method in RxJS that allows you to chain multiple operators together to create a pipeline for processing
    data emitted by an observable. In the `UserService` class, the `pipe` method is used to chain the `tap` operator to 
    the `http.post` method. The `tap` operator is used to perform side effects on the observable stream, such as saving 
    the user to local storage and displaying a success/error message. By using `pipe`,the `login` method can apply the 
    `tap` operator to the observable stream returned by the `http.post` method before returning it to the caller. */
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
          this.saveUserToLocalStorage(user);
          /* `this.userSubject.next(user);` is updating the value of the `BehaviorSubject` with the new
          `user` object. This means that any subscribers to the `userObservable` property will
          receive the updated `user` object. It is called within the `tap` operator of the `login`
          method, which means that it will only be called if the login request is successful and a
          valid `user` object is returned. */
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

  get currentUser(): User {
    return this.userSubject.value;
  }

  /**
   * The function logs out the user by resetting the user subject, removing the user key from local
   * storage, and reloading the page.
   */
  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  /* `private saveUserToLocalStorage` is a private method in the `UserService` class that takes in a
  `User` object as a parameter and saves it to local storage using the `localStorage.setItem()`
  method. The `JSON.stringify()` method is used to convert the `User` object to a JSON string before
  saving it to local storage. This method is called within the `tap` operator of the `login` method
  to save the user object to local storage when the user logs in. By saving the user object to local
  storage, the `UserService` can persist the user's login state across page refreshes or browser
  sessions. */
  private saveUserToLocalStorage = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  /**
   * This function retrieves a User object from local storage or creates a new one if none exists.
   * @returns a User object. If there is a user object stored in the local storage, it will parse the
   * JSON string and return the User object. Otherwise, it will return a new empty User object.
   */
  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? (JSON.parse(userJson) as User) : new User();
  }
}
