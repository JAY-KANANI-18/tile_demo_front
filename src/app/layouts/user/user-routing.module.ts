import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomePageComponent } from 'src/app/pages/home-page/home-page.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PortfolioComponent } from 'src/app/pages/portfolio/portfolio.component';
import { CollectionComponent } from 'src/app/pages/collection/collection.component';

const routes: Routes = [
  { path: '',           redirectTo:'/Home' ,pathMatch:'full'},
  { path: 'Home', component: HomePageComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Portfolio', component: PortfolioComponent },
  { path: 'Portfolio/:collection', component: CollectionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
