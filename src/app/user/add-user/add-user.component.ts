import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  registerForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({

      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      userRole: ['', Validators.required]


    })
  }

  f_error() {
    return this.registerForm.controls;
  }

  add_user() {
    if (this.registerForm.invalid) {
      alert("Some error.");
      return;
    }
    if (this.registerForm.value.password != this.registerForm.value.confirm_password) {
      alert("Password does not match.");
      return;
    }
    
    this.apiService.register(this.registerForm.value)
    .subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

}
