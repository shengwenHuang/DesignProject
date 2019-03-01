<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: object= {
    NHSno : "",
    firstname: "",
    lastname: "",
    email:"",
    phone:""
  };
  
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getUser()
    .subscribe(
      (data) => {this.userData = data, console.log(this.userData)},
      (err) => console.log(err)
    )
  }

}
=======
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData: object= {
    NHSno : "",
    firstname: "",
    lastname: "",
    email:"",
    phone:""
  };
  
  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getUser()
    .subscribe(
      (data) => {this.userData = data, console.log(this.userData)},
      (err) => console.log(err)
    )
  }

}
>>>>>>> 5615d1b1616a2ead442715d417a69cc7972690a9
