import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

// 1. CanActivateFn: A modern Angular functional route guard acts as a "bouncer" 
// before a user is allowed to access a protected route (like /dashboard).
export const authGuard: CanActivateFn = (route, state) => {
  // 2. Dependency Injection: Getting access to the navigation Router 
  // and the Platform ID (to check if we are on the server or browser).
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // 3. SSR Safety Check: Angular Server-Side Rendering (SSR) runs on Node.js, 
  // where 'localStorage' does not exist. We MUST verify we are running in the 
  // user's actual browser before interacting with localStorage, or the app will crash.
  if (isPlatformBrowser(platformId)) {

    // 4. Auth Verification: We check if the user has a saved role/token from 
    // a successful login session. 
    const token = localStorage.getItem('role') && localStorage.getItem('token');

    // 5. Access Granted: If the token exists, they are authenticated. 
    // We return true, telling Angular to allow access to the protected route.
    if (token) {
      return true;
    }

    // 6. Access Denied: If no token is found, they are a guest. 
    // We force-redirect them back to the login page (/) and return false to block entry.
    router.navigate(['/']);
    return false;
  }

  // 7. SSR Pass-through: If the code is running on the Node server during initial render,
  // we return true temporarily to prevent compilation blocking. The real block happens in the browser above.
  return true;
};
