import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { FavsPageComponent } from './views/favs-page/favs-page.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { CharactersPageComponent } from './views/characters-page/characters-page.component';
import { SelectedCharacterPageComponent } from './views/selected-character-page/selected-character-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainLayoutComponent,
    NavbarComponent,
    LoginPageComponent,
    FavsPageComponent,
    HomePageComponent,
    CharactersPageComponent,
    SelectedCharacterPageComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class MainModule { }
