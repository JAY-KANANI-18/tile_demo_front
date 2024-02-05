import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';

const routes: Routes = [
  // { path: '',   component:HomePageComponent},      // redirectTo:'/home' ,pathMatch:'full'},
  { path: 'home', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
