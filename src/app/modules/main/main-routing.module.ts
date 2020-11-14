import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FavsPageComponent } from './views/favs-page/favs-page.component';
import { LoginPageComponent } from './views/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: 'login', component: LoginPageComponent },
    { path: 'favorites', canActivate: [AuthGuard], component: FavsPageComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
