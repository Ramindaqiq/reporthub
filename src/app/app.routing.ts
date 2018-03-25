import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { MainDashboardComponent } from './main/mainDashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { UsersComponent } from './users/users.component';
import { MapsComponent } from './maps/maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './auth-guard.service';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: MainDashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'edit-profile',
                canActivateChild: [AuthGuard],
                component: UserComponent
            },
            {
                path: 'table',
                canActivateChild: [AuthGuard],
                component: TableComponent
            },
            {
                path: 'data-entry',
                canActivateChild: [AuthGuard],
                component: FormComponent
            },
            {
                path: 'users',
                canActivateChild: [AuthGuard],
                component: UsersComponent
            },
            {
                path: 'maps',
                canActivateChild: [AuthGuard],
                component: MapsComponent
            },
            {
                path: 'dashboard',
                canActivateChild: [AuthGuard],
                component: DashboardComponent
            }
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
]
