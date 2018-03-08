import {RouterModule,Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {WelcomeComponent} from './welcome/welcome.component';
import {SignupComponent} from './auth/signup/signup.component';
import {LoginComponent} from './auth/login/login.component';
import {TrainingComponent} from './training/training.component';
//since AuthGuard is a service, we need provide it, since we only use it in this
//routing section , we can provide it here rather than in app.module
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {path: '', component: WelcomeComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'login', component: LoginComponent},
    {path: 'training', component: TrainingComponent, canActivate: [AuthGuard]}
    //this canActivate property of routes take an array of class, which all has
    //canActivate method implemented
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}
