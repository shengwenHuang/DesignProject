import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SurveyComponent } from './survey/survey.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'survey', component: SurveyComponent},
  {path: 'user', component: UserComponent},

  // This is to redirect to login screen
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
