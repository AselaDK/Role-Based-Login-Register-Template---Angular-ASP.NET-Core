import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';


const routes: Routes = [
  { path:'', redirectTo: '/user/login', pathMatch:'full'},
  {
    path:'user', component:UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent},
      { path: 'login', component: LoginComponent }
    ]
  },
  { path: 'home', component:HomeComponent, canActivate:[AuthGuard] },
  { path: 'forbidden', component:ForbiddenComponent },
  { path: 'adminpanel', component:AdminPanelComponent, canActivate:[AuthGuard], data:{permittedRoles:['Admin']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
