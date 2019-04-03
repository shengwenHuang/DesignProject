import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  users: any = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.apiService.get_user()
    .subscribe(
      data => this.users = data,
      err => console.log(err) 
    );
  }

}
