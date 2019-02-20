import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService) { }
  
  ngOnInit() {
    this.loginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', Validators.required]

    });

    // this.loginForm.valueChanges.subscribe(console.log)
  }

  public f_error() {
    return this.loginForm.controls;
  }

  public login() {
    if (this.loginForm.invalid) {
      alert("Please enter your username and password.")
      return;
    }

    this.apiService.login(this.loginForm.value)
    .subscribe(
      data => {
        console.log(data),
        localStorage.setItem('token', data.token),
        this.router.navigate(['/home'])

      },
      err => console.log(err)
    )
  }

}
