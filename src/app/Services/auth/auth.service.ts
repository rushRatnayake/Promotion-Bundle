import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { catchError, map, mapTo, tap } from 'rxjs/operators';
import { API_URL } from '../../app-global';
import { User } from '../../Models/user/user';

import { Tokens } from '../../Models/tokens/tokens';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';
  private readonly CURRENT_PERMISSION = 'CURRENT_PERMISSION';

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  private loggedUser!: string;


  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    if (localStorage.getItem(this.CURRENT_USER) != undefined) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(this.CURRENT_USER) || ''));
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
      this.currentUser = this.currentUserSubject.asObservable();
    }


  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: { email: string, password: string, role: string }): Observable<any> {
    var url = '/oauth/token';
    var data = {
      'email': user.email, 'password': user.password
    }
    var httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' })
    };

    return this.http.post<any>(API_URL + url, data, httpOptions)
      .pipe(
        tap(tokens => this.doLoginUser(user.email, tokens)),
        // tap(tokens => this.storeRole(user)),
        // tap(email => this.getUserDetails()),
        catchError(error => {
          return of(error.error);
        }));


  }

  logout() {
    this.currentUserSubject.next(null);
    return this.doLogoutUser();

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`/refresh`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeJwtToken(tokens.jwt);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens) {
    this.loggedUser = username;
    this.storeTokens(tokens);


  }
  private storeRole(user: any) {
    var UserDetails = user;
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(UserDetails));
    this.currentUserSubject.next({
      role: user.role
    });

  }

  private doLogoutUser() {
    this.removeTokens();
    this.removeUserDetails();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);


  }

  private storeTokens(tokens: any) {
    localStorage.setItem(this.JWT_TOKEN, tokens.payload.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.payload.refreshToken);
    this.getUserDetails();
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private storeUserDetails(UserDetails: User) {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(UserDetails));
    this.currentUserSubject.next({
      full_name: UserDetails.full_name,
      email: UserDetails.email,
      role: UserDetails.role,
      gender: UserDetails.gender,
      dob: UserDetails.dob,
      contact_no: UserDetails.contact_no,
      experience: UserDetails.experience,
      min_pay: UserDetails.min_pay,
      profile_pic: UserDetails.profile_pic,
      company: UserDetails.company,
      designation: UserDetails.designation,
      type: UserDetails.type,
      industry: UserDetails.industry,
      company_pic: UserDetails.company_pic,
      // ratin: UserDetails.full_name,
      id: UserDetails.id,
      password: ''
    });

  }

  private removeUserDetails() {
    localStorage.removeItem(this.CURRENT_USER);
    localStorage.removeItem(this.CURRENT_PERMISSION);
  }

  public getUserDetails() {
    this.http.get<any>(API_URL + '/users/me').subscribe(data => {
      var user = data.payload;
      this.storeUserDetails({
        full_name: user.full_name || 'first_name',
        email: user.email,
        role: user.role,
        gender: user.gender,
        dob: user.dob,
        contact_no: user.contact_no,
        experience: user.experience,
        min_pay: user.min_pay,
        profile_pic: user.profile_pic,
        company: user.company,
        designation: user.designation,
        type: user.type,
        industry: user.industry,
        company_pic: user.company_pic,
        // ratin: user.full_name,
        id: user.id,
        password: ''


      });

      this.router.navigate(['/']);

    });

  }





}