import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { APIResponse } from 'src/app/models/apiresponse';
import { Character } from 'src/app/models/character';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favs-page',
  templateUrl: './favs-page.component.html',
  styleUrls: ['./favs-page.component.scss']
})
export class FavsPageComponent implements OnInit {
  user: User = null;
  loading = false;
  characters: Array<Character> = [];
  API_URL = 'https://rickandmortyapi.com/api/character';
  hayFavs: boolean;

  constructor(private apiRequest: ApiRequestService, private authService: AuthService, private favsService: FavoritesService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    if (this.user) {
      this.getFavs(this.user.uid);
    }
    
  }

  getPage(pageUrl: string, soloUno: boolean): void {
    this.apiRequest.getSomeCharacters(pageUrl).then(response => {
      console.log(response);
      if (soloUno) {
        this.characters.push(response.data);
      } else {
        this.characters = response.data;
      }
      this.loading = false;
      console.log(this.characters);
    }).catch(err => {console.log(err)});
  }

  getCurrentUser(): void {
    this.authService.getCurrentUser().subscribe((response) => {
      if (response) {
        this.user = response;
        this.getFavs(this.user.uid);
        console.log(this.user.uid);
        return;  
      }
      this.user = null;

    });
  }

  
  getFavs(userId: string): void {
    let fav = this.favsService.getFavArray(userId);
    
    this.favsService.getFavorites(userId).then((res) => {
      console.log(res.docs.length)
      let favs = res.docs[0].get('favorites') as Array<number>;
        console.log(favs);
      if (favs.length > 1) {
        console.log("entro")
        this.getPage(this.API_URL + "/" + favs, false);
        this.hayFavs = true;
        
      } else if (favs.length == 1) {
        console.log("entro aqui")
        this.getPage(this.API_URL + "/" + favs, true);
        this.hayFavs = true;
      } else {
        console.log("no hay favs");
        this.hayFavs = false;
        this.loading = false;
        
      }
   });
  }
}
