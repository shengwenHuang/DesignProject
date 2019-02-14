import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  q_obj: any = [
    {id: 1, question: "Do you take any blood thinning medication?"},
    {id: 2, question: "Do you have diabetes, which requires medication?"},
    {id: 3, question: "Do you have high blood pressure OR take medication for high blood pressure?"},
    {id: 4, question: "Do you suffer from angina or chest pain?"},							
    {id: 5, question: "Do you have a pacemaker?"},						
    {id: 6, question: "Do you have asthma or COPD? (Please tick box and circle which)"},							
    {id: 7, question: "If so, do you take anything other than standard inhalers?"},						
    {id: 8, question: "Do you have sleep apnoea?"},							
    {id: 9, question: "Have you ever had kidney disease or kidney failure?"},							
    {id: 10, question: "Do you have any thyroid issues or take medication for your thyroid?"},					
    {id: 11, question: "Have you ever had a clot in your leg or lungs?"},								
    {id: 12, question: "Do you or a family relative have a history of a bleeding OR clotting disorder?"},								
    {id: 13, question: "Have you ever had a TIA or Stroke?"},								
    {id: 14, question: "Do you have epilepsy?"}, 								
    {id: 15, question: "Do you have any diseases of the nerves or muscles? (eg MS, Myasthenia Gravis)"},							
    {id: 16, question: "Do you suffer with any immunology disorders?"},								
    {id: 17, question: "Have you or a blood relative ever had a serious problem with an anaesthetic? (not including nausea and vomiting)"},								
    {id: 18, question: "Do you regularly drink more than 30 units of alcohol per week?"},								
    {id: 19, question: "Are you a SMOKER?"},								
    {id: 20, question: "Do you take HRT or the Oral Contraceptive Pill?"},								
    {id: 21, question: "Would you struggle to manage 2 flights of steps without stopping?"},								
    {id: 22, question: "During the last 12 months have you lived abroad for more than 3 months?"},  								
    {id: 23, question: "During the last 12 months have you stayed in hospital overnight outside the uk?"},  								
    {id: 24, question: "During the last 12 month have you stayed in a uk hospital overnight, excluding MPH, Yeovil and Somerset community hospitals?"},								
    {id: 25, question: "Have you ever been in a household or had ward contact of a known case of Carbapenemase Producing Enterobacteriaceae (CPE)?"},								
    {id: 26, question: "Have you ever been colonised or had an infection with CPE bacteria?"}		
  ];
  new_question: string;
  
  constructor(private apiService: ApiService) { }


  ngOnInit() {
    this.new_question = '';
  }


  addQuestion(): void {    
    this.q_obj.push({
      questionID: null,
      parent: 0,
      question: this.new_question
    })


  }

  delete(question: object): void {
    this.q_obj.splice(this.q_obj.indexOf(question) , 1)  

  }

  edit(): void {
    console.log("Edit");
  }

}

