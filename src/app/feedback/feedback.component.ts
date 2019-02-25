import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'canvasjs.min';

@Component({
    selector: 'app-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  responses : any = [
    {"Title": "How was your experience?", "A1": 5, "A2": 4 ,"A3": 3, "A4": 5, "A5": 2},
    {"Title": "Do you like the app?", "A1": 3, "A2": 2 ,"A3": 3, "A4": 5, "A5": 6 },
    {"Title": "Would you recommend to a friend?", "A1": 6, "A2": 1 ,"A3": 3, "A4": 5, "A5": 4 },
    {"Title": "Are you happy with the NHS in general?", "A1": 5, "A2": 2 ,"A3": 3, "A4": 2, "A5": 0},
    {"Title": "Do you have any more questions?", "A1": 3, "A2": 2 ,"A3": 1, "A4": 5, "A5": 2 },
    {"Title": "Have you had a nice day?", "A1": 2, "A2": 6 ,"A3": 5, "A4": 10, "A5": 2},
  ]

  ngOnInit() {}

    ngAfterViewInit() {

      var i = 0
      for (i = 0; i < this.responses.length; i++) {
        var chart = new CanvasJS.Chart("chartContainer" + i, {
          theme: "light1", // "light1", "light2", "dark1", "dark2"
          animationEnabled: true,
          title: {
            text: this.responses[i].Title
          },
          data: [{
            type: "column",
            toolTipContent: "<b>{label}</b>: {y} Respondent(s)",
            legendText: "{label}",
            dataPoints: [
              { y: this.responses[i].A1, label: "Strongly Disgree" },
              { y: this.responses[i].A2, label: "Disagree" },
              { y: this.responses[i].A3, label: "Neither" },
              { y: this.responses[i].A4, label: "Agree" },
              { y: this.responses[i].A5, label: "Strongly Agree" },
            ]
          }]
        });
        chart.render();
      }

    }

  }
