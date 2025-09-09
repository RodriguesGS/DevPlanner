import { Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/ui/login-page/login-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: 'login', component: LoginPageComponent, title: "Dev Planner | Login" },

    { 
        path: 'register', 
        loadComponent: () => import('./features/auth/ui/register-page/register-page.component')
            .then((m) => m.RegisterPageComponent), 
        title: "Dev Planner | Registre-se"
    },

    { 
        path: 'recover-password',  
        loadComponent: () => import('./features/auth/ui/forgot-password/forgot-password.component')
            .then((m) => m.ForgotPasswordComponent), 
        title: "Dev Planner | Recuperar senha" 
    },

    {
        path: '',
        loadComponent: () => import('./core/layouts/app-shell/app-shell.component')
            .then((m) => m.AppShellComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/ui/dashboard-page/dashboard-page.component')
                    .then((m) => m.DashboardPageComponent),
                title: "Dev Planner | Dashboard" 
            }
        ]

    }
];
