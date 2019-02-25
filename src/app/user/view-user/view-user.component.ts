import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  // users: any = [];

  users: any = [
    {
        "staffNo": "5095158213",
        "firstname": "Leoine",
        "lastname": "Colenutt",
        "email": "lcolenutt8@china.com.cn",
        "phone": "276-201-8464",
        "roleName": "admin"
    },
    {
        "staffNo": "7148701740",
        "firstname": "Mikael",
        "lastname": "Dayly",
        "email": "mdayly4@stanford.edu",
        "phone": "256-568-1848",
        "roleName": "admin"
    },
    {
        "staffNo": "8382063896",
        "firstname": "Gaylor",
        "lastname": "Stickells",
        "email": "gstickells5@tmall.com",
        "phone": "473-252-6717",
        "roleName": "admin"
    },
    {
        "staffNo": "2232209121",
        "firstname": "Devin",
        "lastname": "Vallentine",
        "email": "dvallentine6@indiegogo.com",
        "phone": "202-455-2877",
        "roleName": "admin"
    },
    {
        "staffNo": "3933347548",
        "firstname": "Micaela",
        "lastname": "Mollitt",
        "email": "mmollitt0@example.com",
        "phone": "756-269-2734",
        "roleName": "nurse"
    }]
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    // this.apiService.get_user()
    // .subscribe(
    //   data => this.users = data,
    //   err => console.log(err) 
    // );
  }

}
