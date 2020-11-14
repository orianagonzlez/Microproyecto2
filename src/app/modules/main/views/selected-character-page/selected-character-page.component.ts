import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { ApiRequestService } from 'src/app/services/api-request.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-selected-character-page',
  templateUrl: './selected-character-page.component.html',
  styleUrls: ['./selected-character-page.component.scss']
})
export class SelectedCharacterPageComponent implements OnInit {
  isAuthenticated = false;
  character: Character = null;
  loading = false;

  constructor(private apiRequest: ApiRequestService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { 
    this.route.paramMap.subscribe(params => {
      const characterId = params.get('characterId');
      this.getCharacter(parseInt(characterId, 10));
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCharacter(postId: number) {
    this.loading = true;
    this.apiRequest.getCharacter(postId).then(response => {
      this.character = response.data;
      this.loading = false;
      console.log("recibido");
    }).catch(err => { console.log(err)});
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


