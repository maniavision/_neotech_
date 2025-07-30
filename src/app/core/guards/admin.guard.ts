import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/interfaces';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.getCurrentUser();
  
  if (currentUser) {
    currentUser.subscribe(user => {
      if (user.role === UserRole.ADMIN) {
        return true;
      } else {
        router.navigate(['/']);
        return false;
      }
    })
  }
  router.navigate(['/dashboard']);
  return false;
};
