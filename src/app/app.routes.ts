import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/ui/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/ui/register-page/register-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginPageComponent, title: "Dev Planner | Login" },
    { path: 'register', component: RegisterPageComponent, title: "Dev Planner | Registre-se" }
];
