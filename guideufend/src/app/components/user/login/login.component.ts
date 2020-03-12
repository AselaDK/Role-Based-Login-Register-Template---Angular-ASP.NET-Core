import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // properties for form
  formModel = {
    UserName: '',
    Password: ''
  }

  constructor() { }

  ngOnInit(): void {
  }

}
