import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'ntitleLogin',
    component: LoginComponent,
  },
  {
    path: 'Ntitle',
    loadChildren: () =>
      import('./components/ntitle/ntitle.module').then((m) => m.NtitleModule),
  },
];
