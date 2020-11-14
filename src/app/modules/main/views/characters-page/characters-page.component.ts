import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-characters-page',
  templateUrl: './characters-page.component.html',
  styleUrls: ['./characters-page.component.scss']
})
export class CharactersPageComponent implements OnInit {
  isAuthenticated = false;
  loading= false;
  page: APIResponse;
  characters: Array<Character> = [];
  API_URL = 'https://rickandmortyapi.com/api/character';
  
  filtros = false;
  especie = '';
  tipo = '';
  name = '';

  constructor(private apiRequest: ApiRequestService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getPage('https://rickandmortyapi.com/api/character');
    this.getCurrentUser();
  }



  buscarNombre(): void {
    this.getPage(this.API_URL + "/?name=" + this.name);   
}

  aplicarFiltros(): void {
    if (this.especie && this.tipo) {
      this.getPage(this.API_URL + "/?species=" + this.especie + "&type=" + this.tipo);
    } else if (this.especie) {
      this.getPage(this.API_URL + "/?species=" + this.especie);
    } else if (this.tipo){
      this.getPage(this.API_URL + "/?type=" + this.tipo);
    } else {
    }
       

  }
  getAlive(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?status=alive')
  }

  getDead(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?status=dead')
  }

  getUnknown(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?status=unknown')
  }

  getFemale(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?gender=female')
  }

  getMale(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?gender=male')
  }

  getGenderless(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?gender=genderless')
  }

  getGenderUnknown(): void {
    this.getPage('https://rickandmortyapi.com/api/character/?gender=unknown')
  }

  filtrar(): void {
    this.filtros = !this.filtros;
  }

  getPage(pageUrl: string): void {
    this.apiRequest.getAllCharacters(pageUrl).then(response => {
      console.log(response);
      this.page = response.data;
      this.characters = this.page.results;
    }).catch(err => {console.log(err)});
  }

  getNextPage(): void {
    if (this.page.info.next) {
      this.getPage(this.page.info.next);
    }
  }

  getPrevPage(): void {
    if (this.page.info.next) {
      this.getPage(this.page.info.prev);
    }
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.isAuthenticated = true;
        return;
      }
      this.isAuthenticated = false; 
    });
  }

}

