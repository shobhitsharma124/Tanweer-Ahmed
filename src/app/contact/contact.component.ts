import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  preferences: string[] = ['Male Trainee', 'Female trainee', 'No Preference'];

  countries: string[] = ["India", "Singapore", "US"];
  ages: string[] = ['1', '2', '3', '4'];
  contactForm: FormGroup;
  amount: number;




  constructor(private fb: FormBuilder, private http: HttpClient, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.contactForm = this.fb.group({
      fname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      lname: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),

      message: new FormControl(''),


      mob: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  get f() { return this.contactForm.controls; }

  onFormSubmit() {
    if (!this.contactForm.valid) {

      return;
    }
    console.log(this.contactForm.value);
    this.http.post("http://localhost:3000/contacted", this.contactForm.value).subscribe((data) => { console.log("submitted") });
    this._snackBar.openFromComponent(SnackSubmitComponent, { duration: 2000, });
    this.contactForm.reset();

  }

}

@Component({
  selector: 'snack-onsubmit',
  templateUrl: 'snack-onsubmit.html',
  styles: [`
    .snack-submit {
      color: black;
      font-size: 16px;
    }
  `],
})
export class SnackSubmitComponent { }