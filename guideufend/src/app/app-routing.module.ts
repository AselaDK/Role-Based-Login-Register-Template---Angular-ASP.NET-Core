import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';


const routes: Routes = [
  { path:'', redirectTo: '/user/registration', pathMatch:'full'},
  {
    path:'user', component:UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent},
      { path: 'login', component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
