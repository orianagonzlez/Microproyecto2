import { Component, OnInit } from '@angular/core';
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

  constructor(private apiRequest: ApiRequestService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getPage('https://rickandmortyapi.com/api/character');
    this.getCurrentUser();
  }

  getPage(pageUrl: string): void {
    this.apiRequest.getAllCharacters(pageUrl).then(response => {
      console.log(response);
      this.page = response.data;
      this.characters = this.page.results;
    }).catch(err => {console.log(err)});
  }

  getNextPage() {
    if (this.page.info.next) {
      this.getPage(this.page.info.next);
    }
  }

  getPrevPage() {
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

