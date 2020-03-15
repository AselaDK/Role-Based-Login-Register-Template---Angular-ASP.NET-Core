import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:57169/api';

  // form validations
  formModel = this.fb.group({
    UserName: ["", Validators.required],
    Email: ["", [Validators.required, Validators.email]],
    FullName: ["", Validators.required],
    Passwords: this.fb.group({
      Password: ["", [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ["", Validators.required]
    }, {validator: this.comparePasswords})
  });

  //compare confirm password field for form validations
  comparePasswords(fb:FormGroup){
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //password mismatch
    if(confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors){
      if(fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  //register function for button signup
  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI +'/ApplicationUser/Register', body);
  }

  // login function for button login
  login(formData){
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', formData);
  }

  // load user profile after login
  getUserProfile(){
    return this.http.get(this.BaseURI + '/UserProfile');  // this request is through interceptor
  }

  // check user has permission for access that route
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])); // decrypt the token payload // in web api->ApplicationUserController.cs->Subject is there 
    var userRoles = payLoad.role; // get role/s
    allowedRoles.forEach(element => {   // check that role is in allowed roles
      if(userRoles == element){
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

}
