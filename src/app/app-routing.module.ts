import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { ForgetPasswordComponent } from './components/user/forget-password/forget-password.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { VerifyComponent } from './components/verify/verify.component';
import { AuthGuardService } from './core/authentication/authGuard.service';
import { LoginGuardService } from './core/authentication/loginGuard.service';
import { TempGuardService } from './core/authentication/tempGuard.service';
// import { SignupComponent } from './components/user/signup/signup.component';
// import { LoginComponent } from './components/user/login/login.component';
// import { HomeComponent } from './components/home/home.component';
// import { LoginGuardService } from './core/authentication/loginGuard.service';
// import { AuthGuardService } from './core/authentication/authGuard.service';
// import { LandingComponent } from './components/landing/landing.component';
// import { VerifyComponent } from './components/verify/verify.component';
// import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
// import { TempGuardService } from './core/authentication/tempGuard.service';
// import { ChallengeComponent } from './components/challenge/challenge.component';
// import { StartComponent } from './components/start/start.component';
// import { DateGuardService } from './core/authentication/dateGuard.service';
// import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
// import { ChangePasswordComponent } from './components/user/change-password/change-password.component';
// import { ProfileComponent } from './components/user/profile/profile.component';
// import { RulesComponent } from './components/rules/rules.component';
// import { FinishGuardService } from './core/authentication/finishGuard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LandingComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'sign',
    component: LoginComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'forget',
    component: ForgetPasswordComponent,
    canActivate: [TempGuardService]
  },
  // {
  //   path: 'settings',
  //   component: ChangePasswordComponent,
  //   canActivate: [AuthGuardService]
  // },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuardService]
  // },
  // {
  //   path: 'profile/:teamId',
  //   component: ProfileComponent,
  //   canActivate: [AuthGuardService, DateGuardService]
  // },
  {
    path: 'verify/:id',
    component: VerifyComponent,
    canActivate: [TempGuardService]
  },
  {
    path: '**',
    component: LandingComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
