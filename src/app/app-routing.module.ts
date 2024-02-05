import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [{
  path: '',
  // component: HomePageComponent
  // component:HomePageComponent
  redirectTo: 'home',
  pathMatch: 'full',
},
{ path: '', canActivate: [AuthGuard], loadChildren: () => import('./layouts/user/user.module').then(m => m.UserModule) },
{ path: '', loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule) },
{ path: '**',component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
