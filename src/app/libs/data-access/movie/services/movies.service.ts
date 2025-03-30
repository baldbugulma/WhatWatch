import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environments';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  #http = inject(HttpClient)

  private apiKey = environment.apiKey;
  baseUrl = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?'

  constructor() {}

  searchFilm(name: string, page:number = 1): Observable<any> {
    return this.#http.get(`${this.baseUrl}keyword=${name}&page=${page}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': this.apiKey
      })
    });
  }
}
