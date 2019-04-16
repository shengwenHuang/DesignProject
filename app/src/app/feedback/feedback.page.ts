import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
  providers: [DatePipe]
})
export class FeedbackPage implements OnInit {

  currentDate: number = Date.now();
  feedbackQuestion: any;

  constructor(
    private apiService: ApiService,
    public alert: AlertController,
    private datePipe: DatePipe

  ) { }

  ngOnInit() {
    this.apiService.getFeedbackQues()
    .subscribe(
      (data) => this.feedbackQuestion = data,
      (err) => console.log(err)
    )
  };

  // btnActivate(ionicButton) {
  //   if(ionicButton._color === 'primary')
  //     ionicButton.color =  'danger';
  //   else {

  //   }
  // }

  option(feedback:number, pos:number):void {
    console.log(feedback, pos);
    this.feedbackQuestion[pos - 1].feedback = feedback;
    
  }

  submit() {

    for (let q of this.feedbackQuestion) {
      if (!q.feedback) {
        this.displayAlert("Answer all the question", "Please answer the survey before you submit it.")
        return;
      }
    }
    
    this.apiService.postAddFeedback({startTime: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd, HH:mm:ss'), data: this.feedbackQuestion})
    .subscribe(
      (data) => {
        this.displayAlert("Success", "Thank you for completing the feedback survey.")
      },
      (err) => {
        this.displayAlert("Error", "Please try agian later.")
      }
      )
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
