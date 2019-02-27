import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {


  allHistory: any = [{date: "18/01/ 2019",
  answer: [
    {
        "questionID": 1,
        "question": "Allergies / Adverse reactions to food or medication?",
        "type": "free text",
        "pos": 1,
        "answers": "sadf we sd w weasd ds"
    },
    {
        "questionID": 2,
        "question": "Allergies",
        "type": "yes/no",
        "pos": 2,
        "answers": "no"
    },
    {
        "questionID": 3,
        "question": "Adverse reaction",
        "type": "free text",
        "pos": 3,
        "answers": "ywqeo weo dasow ke  df er"
    },
    {
        "questionID": 4,
        "question": "Testing ... -_-",
        "type": "yes/no",
        "pos": 4,
        "answers": "yes"
    }]
},
{date: "02/02/ 2019",
  answer: [
    {
        "questionID": 1,
        "question": "Allergies / Adverse reactions to food or medication?",
        "type": "free text",
        "pos": 1,
        "answers": "jio reion f er e wwer"
    },
    {
        "questionID": 2,
        "question": "Allergies",
        "type": "yes/no",
        "pos": 2,
        "answers": "yes"
    },
    {
        "questionID": 3,
        "question": "Adverse reaction",
        "type": "free text",
        "pos": 3,
        "answers": "iten sd q,w wqre ew"
    },
    {
        "questionID": 4,
        "question": "Testing ... -_-",
        "type": "yes/no",
        "pos": 4,
        "answers": "no"
    }]

}]

  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.allHistory)
  }

  viewHistory(history: object) {
 
    this.apiService.setCurrentHistory(history)
    this.router.navigate(['/tabs/single-history'])

  }

}
