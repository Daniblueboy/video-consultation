import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  // lazy loading modules
  { path: '', component: LoginComponent },
  {
    path: 'consultation',
    loadChildren: () =>
      import('./pages/consultation/consultation.routes').then((m) => m.routes),
  },
];
