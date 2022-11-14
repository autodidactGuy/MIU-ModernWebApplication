import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.registrationForm=this._formBuilder.group({
      name: "Jack",
      username: "",
      password: "",
      passwordRepeat: ""
    })
   }

  ngOnInit(): void {
    /*this.registrationForm=new FormGroup({
      name: new FormControl("Hassan Raza"),
      username: new FormControl("autodidactGuy"),
      password: new FormControl("Password"),
      passwordRepeat: new FormControl("Password")
    });*/
  }

  //onSubmit(form:FormGroup):void{
  onSubmit():void{
    console.log("form",this.registrationForm.value)
  }
}
