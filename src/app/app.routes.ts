import { Routes } from '@angular/router';
import {LoginPageComponent} from './libs/auth/feature-login/login-page/login-page.component';
import {
  SearchMoviesPageComponent
} from './libs/movies/feature-movies-list/search-movies-page/search-movies-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'search', component: SearchMoviesPageComponent },
];
