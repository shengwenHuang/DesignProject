import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  q_obj: any = [];
  new_question: string;
  
  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.new_question = '';
    this.apiService.getQuestionApi()
    .subscribe(data => this.sort_questions(data));    
  }

  sort_questions(data: object) {
    const temp: any = data;
    let location = {}

    for (let q of temp) {
      if (q.parent == 0) {

        q.parent = [];
        this.q_obj.push(q);
        location[q.questionID] = this.q_obj.indexOf(q)

      } else {
        this.q_obj[location[q.parent]].parent.push(q);
      }
    }
    console.log(this.q_obj)
  }

  

  addQuestion(): void {    
    this.apiService.addQuestionDbApi({
      questionID: null,
      parent: 0,
      question: this.new_question
    })
    .subscribe(
     (data) => {this.q_obj.push(data)},
     (error)=>{console.log('error during post is ', error)
    }
    );

  }

  // delete(question: object): void {
  //   this.apiService.deleteQuestionApi(question.questionID)
  //   .subscribe((data) => this.q_obj.splice(this.q_obj.indexOf(question) , 1))    

  // }

  edit(): void {
    console.log("dsafasdfasdf");
  }

}

