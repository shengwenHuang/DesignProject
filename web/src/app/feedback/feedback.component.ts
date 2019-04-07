import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {
  responses: any = [];

  // responses: any = [
  //   {"Title": "You signed in using the self-check in kiosk and found it easy to use?", "A1": 50, "A2": 40 ,"A3": 30, "A4": 50, "A5": 20},
  //   {"Title": "The POAC waiting area was comfortable", "A1": 32, "A2": 22 ,"A3": 32, "A4": 52, "A5": 62 },
  //   {"Title": "You were kept informed and received all the information/instructions you needed", "A1": 65, "A2": 15 ,"A3": 35, "A4": 55, "A5": 45 },
  //   {"Title": "You were able to complete the screening questions on the iPad/mobile device", "A1": 57, "A2": 27 ,"A3": 37, "A4": 27, "A5": 7},
  //   {"Title": "You would recommend our POAC service to friends and family", "A1": 32, "A2": 22 ,"A3": 12, "A4": 52, "A5": 22 },
  // ]


    constructor(private apiService: ApiService) {}
  
    ngOnInit() {
      this.apiService.getFeedbackApi()
      .subscribe(
        data => {this.responses = data},
        err => console.log(err) 
      ); 
    }


    ngAfterViewInit() {
      

      var i = 0
      for (i = 0; i < this.responses.length; i++) {

        var chart = new Chart(document.getElementById("chartContainer" + i), {
          type: "bar",
          fontSize: 15,
          data: {
            labels: ["Strongly Disagree", "Disagree", "Neither", "Agree", "Strongly Agree"],
            datasets: [
              {
                label: "# of Respondent(s)",
                fontSize: 10,
                data: [
                  this.responses[i].A1,
                  this.responses[i].A2,
                  this.responses[i].A3,
                  this.responses[i].A4,
                  this.responses[i].A5
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
              text: this.responses[i].Title,
              fontSize: 20
            }
          }
        });

      }

    }

  }
