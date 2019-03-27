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
<<<<<<< HEAD
  isNewUser: boolean = false;

=======
  isNewUser:boolean = false;


>>>>>>> afe67f3b5adb00d8472e0ec4caac5512e94151c1
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
<<<<<<< HEAD
    if(this.isNewUser) {
=======
    if (this.isNewUser) {
>>>>>>> afe67f3b5adb00d8472e0ec4caac5512e94151c1
      this.isNewUser = false;
    } else {
      this.isNewUser = true;
    }
<<<<<<< HEAD
    // this.router.navigate(['/feedback'])
=======
    // this.router.navigate(['/user/add-user'])
    // for some reason this does not work. I will try to fix it later.
>>>>>>> afe67f3b5adb00d8472e0ec4caac5512e94151c1
  }

  delete(user: any): void {
    this.apiService.remove_user(user.userID)
    .subscribe(
      data => this.u_obj.splice(this.u_obj.indexOf(user) , 1),
      err => console.log(err)
    );
  }

  edit(): void {
    console.log("dsafasdfasdf");
  }
}


