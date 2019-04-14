import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-surveyresults',
    templateUrl: './surveyresults.component.html',
    styleUrls: ['./surveyresults.component.scss']
})

export class SurveyresultsComponent implements OnInit {
  feedback_obj: any = [];

  // responses: any = [
  //   {"Title": "You signed in using the self-check in kiosk and found it easy to use?", "A1": 50, "A2": 40 ,"A3": 30, "A4": 50, "A5": 20},
  //   {"Title": "The POAC waiting area was comfortable", "A1": 32, "A2": 22 ,"A3": 32, "A4": 52, "A5": 62 },
  //   {"Title": "You were kept informed and received all the information/instructions you needed", "A1": 65, "A2": 15 ,"A3": 35, "A4": 55, "A5": 45 },
  //   {"Title": "You were able to complete the screening questions on the iPad/mobile device", "A1": 57, "A2": 27 ,"A3": 37, "A4": 27, "A5": 7},
  //   {"Title": "You would recommend our POAC service to friends and family", "A1": 32, "A2": 22 ,"A3": 12, "A4": 52, "A5": 22 },
  // ]

    constructor(private apiService: ApiService) { }
  
    async ngOnInit() {

      // this.feedback_obj = await this.apiService.getFeedbackApi().toPromise();
      // console.log('this.feedback_obj',this.feedback_obj)

    }

    async loadData() {

      this.feedback_obj = await this.apiService.getFeedbackApi().toPromise();
      // console.log('this.feedback_obj',this.feedback_obj)

    }


      // this.apiService.getFeedbackApi()
      // .subscribe(

      //  this.apiService.getFeedbackApi()
      // .subscribe(
      //   data => { this.feedback_obj = data,
      //     console.log('inside',this.feedback_obj)},          
      //     ),
      //   // err => console.log(err));
      //   console.log('outside',this.feedback_obj)
      // }

      // async loadData() {
      // await this.apiService.getFeedbackApi()
      //  .subscribe(
      //   data => { this.feedback_obj = data,
      //     console.log('inside',this.feedback_obj)},          
      //     ),
      //   // err => console.log(err));
      //   console.log('outside',this.feedback_obj)
      // }

      // async loadData() {
      //   this.feedback_obj = await this.apiService.getFeedbackApi().toPromise()
      // }
    
    async ngAfterViewInit() {

      await this.loadData()

      console.log('feedback_obj length is', this.feedback_obj.length),
      console.log(this.feedback_obj)

      function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    await delay(300);
     
      var i = 0
      for (i = 0; i < this.feedback_obj.length; i++) {
        console.log("i is ",i)
        // console.log("object ",i," is ",this.feedback_obj[i])
        // console.log("title for",i," is ",this.feedback_obj[i].Title)


          var chart = new Chart(document.getElementById("chartContainer" + i), {
          // console.log("inside chart")
          type: "bar",
          fontSize: 15,
          data: {
            labels: ["Strongly Disagree", "Disagree", "Neither", "Agree", "Strongly Agree"],
            datasets: [
              {
                label: "# of Respondent(s)",
                fontSize: 10,
                data: [
                  this.feedback_obj[i].A1,
                  this.feedback_obj[i].A2,
                  this.feedback_obj[i].A3,
                  this.feedback_obj[i].A4,
                  this.feedback_obj[i].A5,
                  // console.log(this.feedback_obj[i].A5)
                ],
                backgroundColor: [
                  'rgba(255,   0,   0, 0.4)',
                  'rgba(255, 165,   0, 0.4)',
                  'rgba(255, 255,   0, 0.4)',
                  'rgba(  0, 255, 255, 0.4)',
                  'rgba(  0, 255,   0, 0.4)'
                  ],
                borderColor: [
                  'rgba(255,   0,   0, 1)',
                  'rgba(255, 165,   0, 1)',
                  'rgba(255, 255,   0, 1)',
                  'rgba(  0, 255, 255, 1)',
                  'rgba(  0, 255,   0, 1)'
                  ],
                borderWidth: 1,
              }
            ]
          },
          options: {
            tooltips: {
              titleFontSize: 15,
              bodyFontSize: 15 },
            scales: {
              xAxes: [{
                  ticks: {
                      fontSize: 15,
                      fontStyle: "bold"
                  }
              }],
              yAxes: [{
                ticks: {
                    fontSize: 15,
                    beginAtZero: true,
                    callback: function(value) {if (value % 1 === 0) {return value;}}
                }
            }]
          },
            legend: { display: false },
            title: {
              display: true,
              text: this.feedback_obj[i].Title,
              fontSize: 20
            }
          }
        });
      
      }
    
    }

  }