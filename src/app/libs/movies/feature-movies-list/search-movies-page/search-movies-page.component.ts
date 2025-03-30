import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {WwInputComponent} from '../../../common-ui/components/ww-input/ww-input.component';
import {MoviesListComponent} from '../movies-list/movies-list.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {catchError, debounceTime, filter, of, switchMap, takeUntil} from 'rxjs';
import {MoviesService} from '../../../data-access/movie/services/movies.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'search-movies-page',
  standalone: true,
  imports: [
    WwInputComponent,
    MoviesListComponent,
    ReactiveFormsModule
  ],
  templateUrl: './search-movies-page.component.html',
  styleUrl: './search-movies-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchMoviesPageComponent implements OnInit {
  moviesService = inject(MoviesService)
  destroyRef = inject(DestroyRef)

  movies = signal<any | null>(null)


  form = new FormGroup({
    name: new FormControl<string>(''),
  })

  ngOnInit(): void {
    this.form.controls.name.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((res: string | null): res is string => res !== null && res.length > 3),
        debounceTime(500),
        switchMap((res: string) => this.moviesService.searchFilm(res)),
        catchError((err) => of(`Ошибка ${err}`))
      )
      .subscribe(res => {
        this.movies.set(res.films)
        console.log(res)
      });
  }

  search(){
  }
}
