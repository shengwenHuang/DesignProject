import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  all_question: any


    
  constructor(
    private apiService: ApiService,
    private alert: AlertController) {  }

  

  ngOnInit() {
    this.all_question = [
      {
          "questionID": 1,
          "question": "Allergies / Adverse reactions to food or medication?",
          "type": "free text",
          "pos": 1,
          "answers": ""
      },
      {
          "questionID": 2,
          "question": "Allergies",
          "type": "yes/no",
          "pos": 2,
          "answers": ""
      },
      {
          "questionID": 3,
          "question": "Adverse reaction",
          "type": "free text",
          "pos": 3,
          "answers": ""
      },
      {
          "questionID": 4,
          "question": "Testing ... -_-",
          "type": "yes/no",
          "pos": 4,
          "answers": ""
      }]

    // this.apiService.getQuestions()
    // .subscribe(
    //   (data) => this.all_question = data,
    //   (err) => console.log(err)
    // )

  }
  yes(pos: number) {
    this.all_question[pos -1].answers = "yes"; 
    console.log(pos)
    console.log(this.all_question[pos -1])
  }

  no(pos: number) {
    this.all_question[pos -1].answers = "no"; 
    console.log(this.all_question[pos -1])
  }

  submit() {
    
    for (let q of this.all_question) {
      if (q.type === "free text") {
        console.log()
      }
      if (!q.answers) {
        this.displayAlert("Please complete the survey", "Please answer all the question.");
        return;
      }
      this.displayAlert("Success", "Thank you for filling in the survey")
    }
  } 


  async displayAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["Ok"]
    })

    await alert.present()

  }

}
					
