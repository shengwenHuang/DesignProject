import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loginUrl: string = 'http://localhost:3000/login';
  private registerUrl: string = 'http://localhost:3000/register'
  private removeUserUrl: string = 'http://localhost:3000/remove_user'
  private getUserUrl: string = 'http://localhost:3000/get_user'

  private getapiUrl: string = 'http://localhost:3000/questions';
  private addapiUrl: string = 'http://localhost:3000/add_question';
  private deleteUrl: string = 'http://localhost:3000/delete_question/';


  constructor(
    private http: HttpClient,
    private router: Router) { }

  getQuestionApi() {
    return this.http.get(this.getapiUrl);
  }

  addQuestionDbApi(obj: object) {

    return this.http.post(this.addapiUrl, obj);
  }

  deleteQuestionApi(id: number) {
    return this.http.get(`${this.deleteUrl}${id}`);
  }

  get_user() {
    return this.http.get(this.getUserUrl)
  } 
  login(user: object) {
    return this.http.post<any>(this.loginUrl, user);
  }

  register(user: object) {
    return this.http.post(this.registerUrl, user);
  }

  remove_user(user: object) {
    return this.http.post(this.removeUserUrl, user);
  }


  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  
  isLoggedIn() : boolean {
    return !!localStorage.getItem('token');
  
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
