import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movieService/movie-service';
import { CastMember, Movie, MovieDetails } from '../../shared/models/movie';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) {}

  movieId!: number;
  imageBaseUrl = environment.tmdb_imageBaseUrl;

  movieDetails!: MovieDetails;
  similarMovies!: Movie[];
  cast!: CastMember[];

  ngOnInit(): void {
    // console.log(this.movieId);
    // this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    this.movieService.getMovieDetailsById(this.movieId).subscribe({
      next: (res) => {
        this.movieDetails = res;
        console.log(this.movieDetails);
      },
      error: (err) => {
        console.error('Failed to load movie details:', err);
      },
    });

    //getSimilarMovies
    this.movieService.getCast(this.movieId).subscribe({
      next: (res) => {
        this.cast = res.cast.filter((cast) => cast.known_for_department === 'Acting').slice(0, 12);

        // this.cast = res.cast.slice(0, 9);
        // this.cast = this.cast.map((movie) => ({
        //   ...movie,
        //   genre_names: this.movieService.getGenreNames(movie.genre_ids),
        // }));
        // console.log(this.similarMovies);
      },
      error: (err) => {
        console.error('Failed to fetch cast:', err);
      },
    });

    //getSimilarMovies
    this.movieService.getSimilarMovies(this.movieId).subscribe({
      next: (res) => {
        this.similarMovies = res.results.slice(0, 9);
        this.similarMovies = this.similarMovies.map((movie) => ({
          ...movie,
          genre_names: this.movieService.getGenreNames(movie.genre_ids),
        }));
        console.log(this.similarMovies);
      },
      error: (err) => {
        console.error('Failed to fetch popular movies:', err);
      },
    });
  }
}
