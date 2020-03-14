import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userDetails;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails = res;
      },
      err=>{
        console.log(err);
      }
    );
  }

  // logout button click
  onLogout(){
    //we have to remove token created from local storage
    localStorage.removeItem('token');
    // navigate to login
    this.router.navigate(['/user/login']);

  }
}
