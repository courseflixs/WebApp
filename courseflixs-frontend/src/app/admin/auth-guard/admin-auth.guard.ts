import { CanActivateFn,Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

UserAuthService
export const adminAuthGuard: CanActivateFn = (route, state) => {
  const adminUserService = inject(UserAuthService)
  const router = inject(Router);
    // if(localStorage.getItem('adminLogin'))
    return true;
    // else
    // return router.navigate(['/admin/login'])
    }

