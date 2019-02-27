import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  currentHistory: any;

  private questionUrl = 'http://localhost:3000/questions'
  private feedbackQuesUrl = 'http://localhost:3000/app/feedback_ques'
  private addFeedbackUrl = 'http://localhost:3000/app/add_feedback'
  private userInfoURL = 'http://localhost:3000/app/patient_info'

  constructor(private http: HttpClient) { }

  setCurrentHistory(history) {
    this.currentHistory = history;
  }

  getQuestions() {
    return this.http.get<any>(this.questionUrl);
  }

  getFeedbackQues() {
    return this.http.get<any>(this.feedbackQuesUrl);
  }

  postAddFeedback(obj: object) {
    return this.http.post<any>(this.addFeedbackUrl, obj);
  }

  getUser() {
    return this.http.get(this.userInfoURL);
  }



}
