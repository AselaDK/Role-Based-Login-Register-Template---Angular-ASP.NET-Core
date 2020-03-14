import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

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

  //conpare confirm password field for form validations
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

}
