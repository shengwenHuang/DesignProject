import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})

export class PatientComponent implements OnInit {

  isSearch:boolean = false;
  patientHistories:any;

  patientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService) { }

  ngOnInit() {
    this.patientForm = this.fb.group({
      Nhsno: ['', Validators.required],
      lastname: ['', Validators.required]
    })
  }

  search() {
    console.log(this.patientForm.value)
    if (this.patientForm.invalid) {
      alert("Please the Nhsno and the lastname.")
      return;
    }

    this.apiService.getPatientInfo(this.patientForm.value)
    .subscribe(
      data => {
        this.patientHistories = data,
        this.isSearch = true;

      },
      err => {
        console.log(err),
        this.patientHistories = [];
        this.isSearch = false;
      }
    )
  }

}
