import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

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
        console.log("Success"),
        console.log(data)
      },
      err => console.log(err)
    )
  }

}
