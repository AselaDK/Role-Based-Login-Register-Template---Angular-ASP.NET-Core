import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public service: UserService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit(){
    this.service.register().subscribe(
      (res:any) => {    // success function
        if(res.succeeded){
          this.service.formModel.reset(); 
          this.toastr.success('New user created', 'Registration Successfull.');
        }else{
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateEmail':
                // Email is already taken
                this.toastr.error('Email is already taken', 'Registration Failed.');
                break;
              case 'DuplicateUserName':
                // Username is already taken
                this.toastr.error('Username is already taken', 'Registration Failed.');
                break;
              
              default:
                //registration failed
                this.toastr.error(element.description, 'Registration Failed.');
                break;
            }
          });
        }
      },

      err => {   // error functions
        console.log(err);
      }
    )
  }

}
