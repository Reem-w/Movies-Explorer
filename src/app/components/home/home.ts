import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movieService/movie-service';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    console.log('hello from home');
    this.movieService.getPopularMovies().subscribe({
      next: (res) => {
        this.popularMovies = res.results.slice(0, 9);
        this.popularMovies = this.popularMovies.map((movie) => ({
          ...movie,
          genre_names: this.movieService.getGenreNames(movie.genre_ids),
        }));
        console.log(this.popularMovies);
      },
      error: (err) => {
        console.error('Failed to fetch popular movies:', err);
      },
    });

    this.movieService.getTopRatedMovies().subscribe({
      next: (res) => {
        this.topRatedMovies = res.results.slice(0, 9);
        this.topRatedMovies = this.topRatedMovies.map((movie) => ({
          ...movie,
          genre_names: this.movieService.getGenreNames(movie.genre_ids),
        }));
        console.log(this.topRatedMovies);
      },
      error: (err) => {
        console.error('Failed to fetch top rated movies:', err);
      },
    });
  }
}
