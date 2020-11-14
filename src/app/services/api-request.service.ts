import { Injectable } from '@angular/core';
import Axios, { AxiosResponse } from 'axios';
import { APIResponse } from '../models/apiresponse';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  API_URL = 'https://rickandmortyapi.com/api/character';

  constructor() { }

  getAllCharacters(pageUrl: string): Promise<AxiosResponse<APIResponse>> {
    return Axios.get(pageUrl);
  }

  getCharacter(characterId: number): Promise<AxiosResponse<Character>> {
    return Axios.get(`${this.API_URL}/${characterId}`);
  }
  
}
