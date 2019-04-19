import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-surveyresults',
    templateUrl: './surveyresults.component.html',
    styleUrls: ['./surveyresults.component.scss']
})

export class SurveyresultsComponent implements OnInit {
  survey_obj: any = [];

    constructor(private apiService: ApiService) { }
  
    async ngOnInit() {

    }

    async loadData() {

      this.survey_obj = await this.apiService.getAssessmentApi().toPromise();
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
  
        // console.log('feedback_obj length is', this.feedback_obj.length),
        // console.log(this.feedback_obj)
  
        function delay(ms: number) {
          return new Promise( resolve => setTimeout(resolve, ms) );
      }
      await delay(300);
       
        var i = 0
        for (i = 0; i < this.survey_obj.length; i++) {
          console.log("i is ",i)
          console.log("survey_obj is",this.survey_obj)
          // console.log("object ",i," is ",this.feedback_obj[i])
          // console.log("title for",i," is ",this.feedback_obj[i].Title)
  
  
            var chart = new Chart(document.getElementById("surveyContainer" + i), {
            // console.log("inside chart")
            type: "pie",
            fontSize: 15,
            data: {
              labels: ["Yes","No"],
              datasets: [
                {
                  label: "Respondent Yes/No's",
                  fontSize: 10,
                  data: [
                    this.survey_obj[i].yes,
                    this.survey_obj[i].no,
                    // console.log(this.feedback_obj[i].A5)
                  ],
                  backgroundColor: [
                    'rgba(  0, 255,   0, 0.4)',
                    'rgba(255,   0,   0, 0.4)',
                    // 'rgba(255, 255,   0, 0.4)',
                    // 'rgba(  0, 255, 255, 0.4)',
                    // 'rgba(  0, 255,   0, 0.4)'
                    ],
                  borderColor: [
                    'rgba(  0, 255,   0, 1)',
                    'rgba(255,   0,   0, 1)',
                    // 'rgba(255, 255,   0, 1)',
                    // 'rgba(  0, 255, 255, 1)',
                    // 'rgba(  0, 255,   0, 1)'
                    ],
                  borderWidth: 1,
                }
              ]
            },
            options: {
              tooltips: {
                titleFontSize: 15,
                bodyFontSize: 15 },
            //   scales: {
            //     xAxes: [{
            //         ticks: {
            //             fontSize: 12,
            //             fontStyle: "bold"
            //         }
            //     }],
            //     yAxes: [{
            //       ticks: {
            //           fontSize: 15,
            //           beginAtZero: true,
            //           callback: function(value) {if (value % 1 === 0) {return value;}}
            //       }
            //   }]
            // },
              legend: { display: false },
              title: {
                display: true,
                text: this.survey_obj[i].question,
                fontSize: 20
              }
            }
          });
        
        }
      
      }
  
    }