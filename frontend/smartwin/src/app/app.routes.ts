import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboards } from './components/dashboards/dashboards';
import { authGuard } from './guards/auth.guard'; // Import the guard

export const routes: Routes = [
      {
            path: "",
            component: Login
      },
      {
            path: "dashboard",
            component: Dashboards,
            canActivate: [authGuard] // Protect this route!
      }
];
