import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({

      username: ['', [Validators.required, , Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[+]447\d{9}$')]],
      userRole: ['', Validators.required]


    })
  }

  //   registerForm = this.fb.group({
  //   staff_username: ['', Validators.required],
  //   password: ['', [Validators.required, Validators.minLength(6)]],
  //   confirm_password: ['', Validators.required],
  //   firstname: ['', Validators.required],
  //   lastname: ['', Validators.required],
  //   email: ['', Validators.required, Validators.email],
  //   phone: ['', [Validators.required, Validators.pattern('^[+]447\d{9}$')]],
  //   userRole: ['', Validators.required]
  // });

  goBack() {
    this.router.navigate(["user"])
  }

  getError(id:string) {
    return this.registerForm.get(id);
  }

  add_user() {
    if (this.registerForm.invalid) {
      // alert("Please complete the form.");
      return;
    }
    if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
      alert("Password does not match.");
      return;
    }
    
    this.apiService.register(this.registerForm.value)
    .subscribe(
      (data) => console.log(data),
      (err) => {
        console.log(err),
        alert("Something wrong :)");
      }
    );
  }

}
