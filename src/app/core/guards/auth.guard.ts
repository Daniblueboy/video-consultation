import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// This guard checks if the user is authenticated by checking if the user object has a name and role.
// If not, it redirects to the login page.
// If the user is authenticated, it allows access to the route.

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const user = auth.getUser();
  if (!user?.name || !user?.role) {
    router.navigate(['/']);
    return false;
  }

  return true;
};