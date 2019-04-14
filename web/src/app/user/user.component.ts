import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  u_obj: any = [];
  new_user: string;
  isNewUser:boolean = false;


  constructor(
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.new_user = '';
    this.apiService.get_user()
    .subscribe(
      data => this.u_obj = data,
      err => console.log(err) 
    ); 
  }

  
  addUser(): void {
    // if (this.isNewUser) {
    //   this.isNewUser = false;
    // } else {
    //   this.isNewUser = true;
    // }
    this.router.navigate(['/user/add-user'])
    // for some reason this does not work. I will try to fix it later.
  }

  delete(user: any): void {
    this.apiService.remove_user(user)
    .subscribe(
      data => this.u_obj = data,
      err => console.log(err)
    );
  }

  edit_user(user: any): void {
    this.apiService.edit_user(user)
    .subscribe(
      data => this.u_obj = data,
      err => console.log(err)
    );
  }
}


