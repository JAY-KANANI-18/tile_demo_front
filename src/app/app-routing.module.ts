import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard.service';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './layouts/user/user.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'Home',
  pathMatch: 'full',
},
{
  path: '',
  component: UserComponent,
  children: [
    {
      path: "",
      loadChildren: () => import('./layouts/user/user.module').then(m => m.UserModule)
    }
  ],
  canActivate: [AuthGuard]
},
{
  path: '',
  component: AuthComponent,
  children: [
    {
      path: "",
      loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
    }
  ],
},
{ path: '**', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
