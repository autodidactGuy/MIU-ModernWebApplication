import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

class Credentials{
  #username!:string;
  #password!:string;

  constructor(username:string,password:string){
    this.username=username;
    this.password=password;
  }
  set username(username:string){
    this.#username=username;
  }
  set password(password:string){
    this.#password=password;
  }

  get username():string{
    return this.#username;
  }
  get password():string{
    return this.#password;
  }

  toJSON(){
    return {
      username: this.username,
      password: this.password
    }
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:Credentials=new Credentials("username","password");
  @ViewChild("loginForm")
  loginForm!:NgForm;

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      console.log("Hello there!",this.user.toJSON());
      this.loginForm.setValue(this.user.toJSON());
    },0); 
  }

  onLogin(){
    console.log("Login clicked");
    console.log(this.loginForm.value);

    let user:Credentials=new Credentials(this.loginForm.value.username,this.loginForm.value.password);
    
  }

  onClear(){
    this.loginForm.setValue({username:"",password:""});
  }
}
