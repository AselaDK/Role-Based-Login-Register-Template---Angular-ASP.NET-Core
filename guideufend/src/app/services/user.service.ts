import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder) { }

  formModel = this.fb.group({
    UserName: ["", Validators.required],
    Email: ["", [Validators.required, Validators.email]],
    FullName: ["", Validators.required],
    Passwords: this.fb.group({
      Password: ["", [Validators.required, Validators.minLength(6)]],
      ConfirmPassword: ["", Validators.required]
    }, {validator: this.comparePasswords})
  });

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
}
