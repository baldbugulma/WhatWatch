import {ChangeDetectionStrategy, Component, input} from '@angular/core';

@Component({
  selector: 'movies-list',
  standalone: true,
  imports: [],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  movies = input<any>([1,2,3])
}
