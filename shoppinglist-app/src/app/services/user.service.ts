import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../models/user';
import {catchError} from "rxjs/operators";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: Observable<User>
  private userSubject: BehaviorSubject<User>;

  usersUrl = "http://localhost:8080/user";


  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("id") || '{}' ));
    this.user = this.userSubject.asObservable();
   }

  /**
   * Sends post request to login route and returns the user
   * @param user
   */
  public loginUser(user: User): Observable<User> {
    const url = this.usersUrl + "/login";
    this.http.post<User>(url, user).subscribe(data => {
    });

    return this.http.post<User>(url, user)
      .pipe(catchError(this.handleError));

  }

  /**
   * Handles logging out by removing the user id from the session storage
   */
   public logOut() {
    window.sessionStorage.clear();
    let nullUser = new User()
    this.userSubject.next(nullUser);
    this.router.navigate([""])
  }

  /**
   * Handles different kinds of errors which might occur
   * @param error
   * @private
   */
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'An error has occurred; please try again later.');
  }

}
