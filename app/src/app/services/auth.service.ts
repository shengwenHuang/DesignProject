import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginURL = 'http://localhost:3000/app/login'
  authenticationState = new BehaviorSubject(false);



  constructor(
    private http: HttpClient,
    private plt: Platform,
    private storage: Storage,
    private router: Router) { }

  login(user: object) {
    return this.http.post<any>(this.loginURL, user)
  }

  setStorage(token:string): void {
    this.storage.set("token",token);
    this.authenticationState.next(true);
  }

  getToken() {
    return this.storage.get("token");
  }

  logout() {
    this.storage.remove("token").then(() => {
      this.authenticationState.next(false)
    })

  }

  isAuth() {
    return this.authenticationState.value;
  }
}
