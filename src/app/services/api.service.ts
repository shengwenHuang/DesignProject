import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getapiUrl: string = 'http://localhost:3000/questions';
  addapiUrl: string = 'http://localhost:3000/create';
  deleteUrl: string = 'http://localhost:3000/delete_question/'

  constructor(private http: HttpClient) { }

  getQuestionApi() {
    return this.http.get(this.getapiUrl);
  }

  addQuestionDbApi(obj: object) {

    return this.http.post(this.addapiUrl, obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      
    });

  }

  deleteQuestionApi(id: number) {
    return this.http.get(`${this.deleteUrl}${id}`);
  }
}
