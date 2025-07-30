import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
  },
  {
    path: 'request',
    loadComponent: () => import('./features/requests/request-form/request-form').then(m => m.RequestForm),
    // canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard),
    // canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin').then(m => m.Admin),
    // canActivate: [authGuard, adminGuard]
  },
  {
    path: 'requests/:id',
    loadComponent: () => import('./features/requests/request-detail/request-detail').then(m => m.RequestDetail),
    // canActivate: [authGuard]
  },
  {
    path: 'confirm/:token',
    loadComponent: () => import('./features/auth/confirm/confirm').then(m => m.Confirm)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
