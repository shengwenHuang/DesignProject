import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  removeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.removeForm = this.fb.group({
      staffNo: ['', Validators.required],
    })
  }

  remove_user() {
    if (this.removeForm.invalid) {
      alert("Some error.");
      return;
    }
    
    this.apiService.remove_user(this.removeForm.value)
    .subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    );
  }

}
