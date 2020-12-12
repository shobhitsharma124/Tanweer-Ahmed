import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl,  Validators, FormGroup,FormBuilder, FormsModule, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-place-app',
  templateUrl: './place-app.component.html',
  styleUrls: ['./place-app.component.css'],
 
})
export class PlaceAppComponent implements OnInit {

  // selectedTraineePreference: string;
  preferences: string[] = ['Male Trainee', 'Female trainee', 'No Preference'];

  // countryControl = new FormControl('', Validators.required);
  // selectFormControl = new FormControl('', Validators.required);
  countries: string[] = ["India","Singapore","US"];
  ages: string[] = ['1','2','3','4'];
  appointmentForm: FormGroup;
  amount : number;
  

  

  constructor(private fb: FormBuilder,private http:HttpClient, private _snackBar: MatSnackBar) { }
 

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      fname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      lname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      address: new FormGroup({
        street: new FormControl('',Validators.required),
        city: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
        state: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
        country: new FormControl('',Validators.required),
        postal: new FormControl('',[Validators.required,Validators.minLength(6),Validators.pattern(/^[0-9]+$/)])
      }),
      bfname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      blname: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
      mob: new FormControl('',[Validators.required,Validators.minLength(10),Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      age: new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.min(18),Validators.max(80)]),
      tpreference: new FormControl('',Validators.required),
      physio: new FormControl('',Validators.required),
      package: new FormControl('',Validators.required),
    });
  }

  get f() { return this.appointmentForm.controls; }
  
  calcAmount(amount : number){
    if(amount==500){
      this.amount = amount;
    }else if(amount==400){
      this.amount =amount*4;
    }else if(amount==300){
      this.amount = amount*5;
    }
  }

 formSubmitted:any;

 dataToServer:{sno:string,name:string,city:string,mobile:string,tpreference:string,package:string}={
  sno:"",
  name:"",
  city:"",
  mobile:"",
  tpreference:"",
  package:""
 };

  onFormSubmit(){
    if (!this.appointmentForm.valid) {
     
      return;
    }

    let respo = this.http.get("http://localhost:3000/appointment");
    respo.subscribe((data)=>{
      console.log(Object.keys(data).length)
      this.formSubmitted=this.appointmentForm.value;
      this.formSubmitted.id=Object.keys(data).length+1;
      console.log(this.formSubmitted.id);
      this.dataToServer.sno = ""+this.formSubmitted.id;
      this.dataToServer.name = this.formSubmitted.fname + " " + this.formSubmitted.lname;
      this.dataToServer.city = this.formSubmitted.address.city;
      this.dataToServer.mobile = this.formSubmitted.mob;
      this.dataToServer.tpreference = this.formSubmitted.tpreference;
      this.dataToServer.package = this.formSubmitted.package;

      console.log(this.dataToServer);

      console.log(this.appointmentForm.value);
      this.http.post("http://localhost:3000/appointment", this.dataToServer).subscribe((data)=>{console.log("submitted")});
      this._snackBar.openFromComponent(SnackSubmitComponent, {duration:2000,});
      this.appointmentForm.reset();

    });
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
export class SnackSubmitComponent {}