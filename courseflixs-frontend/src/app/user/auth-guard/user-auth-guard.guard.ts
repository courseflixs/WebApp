import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userAuthGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
    if(sessionStorage.getItem('userID'))
    return router.navigate(['/'])
    else
    return true;
};
