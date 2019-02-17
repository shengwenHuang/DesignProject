import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private loginUrl: string = 'http://localhost:3000/login';

  private getapiUrl: string = 'http://localhost:3000/questions';
  private addapiUrl: string = 'http://localhost:3000/create';
  private deleteUrl: string = 'http://localhost:3000/delete_question/';


  constructor(
    private http: HttpClient,
    private router: Router) { }

  getQuestionApi() {
    return this.http.get(this.getapiUrl);
  }

  addQuestionDbApi(obj: object) {

    return this.http.post(this.addapiUrl, obj, {
      // headers: new HttpHeaders({
      //   'Content-Type': 'application/json'
      // }),
      
    });
  }

  deleteQuestionApi(id: number) {
    return this.http.get(`${this.deleteUrl}${id}`);
  }

  login(user: object) {
    return this.http.post<any>(this.loginUrl, user);
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
