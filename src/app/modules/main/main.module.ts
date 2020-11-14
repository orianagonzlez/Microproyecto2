import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { FavsPageComponent } from './views/favs-page/favs-page.component';


@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    LoginPageComponent,
    FavsPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    
  ]
})
export class MainModule { }
