import { Component, OnInit} from '@angular/core';
import { ApiService } from '../services/api.service';

// interface ControlValueAccessor {  
//   writeValue(obj: any): void
//   registerOnChange(fn: any): void
//   registerOnTouched(fn: any): void
//   setDisabledState(isDisabled: boolean): void
// }

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})

export class SurveyComponent implements OnInit {

  q_obj: any = [];
  input_question: string;
  input_ID: number;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {    
    this.input_question = '';
    this.input_ID = null;
    this.apiService.getQuestionApi()
    .subscribe(
      data => this.q_obj = data,
      err => console.log(err));    
  }
  
// var vm = this;
// vm.inArray = inArray;

// inArray(needle: number,haystack: array)
// {
//   console.log(haystack)
//   console.log("looking for",needle)
//     var count=haystack.length;
//     console.log(haystack.length);
//     for(var i=0;i<count;i++){
//       console.log("haystack[i]",haystack[i])
//       if(haystack[i].questionID == needle){
//         console.log("here for ",i);
//         return i
//       }
//       else
//       {
//         console.log("not here for ",i);
//         return -1
//       };
//     }      
// }

onChange: any = () => { };
registerOnChange(fn) {
  this.onChange = (obj) => fn(obj);
}

  async addQuestion(): Promise<void> {

    // for(var i=0;i<this.q_obj.length;i++)
    //     {
    //         if(this.q_obj[i].questionID === this.input_ID){console.log("found!")}
    //     }
    //     console.log("not found")
    // };

    // console.log("whole question object",this.q_obj)
    // console.log("is in array?",this.inArray(this.input_ID,this.q_obj))
    
    var count = this.q_obj.length;
    console.log("length of q_obj is", this.q_obj.length);
    console.log("this.input_ID",this.input_ID);
    for (var i = count - 1; i >= 0; i--){
      console.log("this.q_obj[i].questionID for",i,"is",this.q_obj[i].questionID);
      if (this.q_obj[i].questionID == this.input_ID) {
        console.log("found a match to delete: i",i,"q_obj[i]",this.q_obj[i]);
      await this.apiService.deleteQuestionApi(this.input_ID)
      .toPromise().then(
        data => this.q_obj.splice(i,1),
        err => console.log(err))
      }
    }

    // var i = this.inArray(this.input_ID,this.q_obj)
    // console.log('the inner index is:',i)
    // if (i != -1) {
    //   this.apiService.deleteQuestionApi(this.input_ID)
    //   .subscribe(
    //     data => this.q_obj.splice(i, 1),
    //     err => console.log(err))
    // } 
    // if (this.input_ID == 4) {    
    //   this.apiService.deleteQuestionApi(this.input_ID)
    //   .subscribe(
    //     data => this.q_obj.splice(this.q_obj.indexOf(this.input_ID)), 1),
    //     err => console.log(err))
    // }
    this.apiService.addQuestionDbApi({
      parentQuestion: 0,
      question: this.input_question,  
      questionID: this.input_ID,
      pos: 0,
      type: 1,
    })
    // console.log("maximum pos is ",findmax('pos'))
    .subscribe(
     data => {this.q_obj.push(data)},
     error =>{console.log('error during post is ', error)
    }
    );

  }

  delete(question: any): void {
    console.log(this.q_obj.indexOf(question))
    this.apiService.deleteQuestionApi(question.questionID)
    .subscribe(
      data => this.q_obj.splice(this.q_obj.indexOf(question), 1),
      err => console.log(err))
  }

  edit(question: any): void {
    // this.onChange(this.value);
    this.input_ID = question.questionID
    // var inputElement = <HTMLInputElement>document.getElementById("edit_ID");
    // inputElement.value = question.questionID;
    this.input_question = question.question
    // var inputElement = <HTMLInputElement>document.getElementById("edit_question")
    // inputElement.value = question.question;
    // this.onChange(this.value);
    console.log(question.pos);
  }

  moveup(question: any): void {
    question.pos -= 1
    console.log(question.pos)
  }

  movedown(question: any): void {
    question.pos += 1
    console.log(question.pos)
  }

  toggletype(question: any): void {
    question.type == 'yes/no' ? question.type = 'free text' : question.type = 'yes/no', 
    console.log(question.type)
  }
  
  filterBy(prop: string) {
    return this.q_obj.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  // findmax(prop: string) {
  //   return max = this.q_obj.reduce((prev, current) => (prev[pos] > current[pos]) ? prev : current, 1)
  // }

}

