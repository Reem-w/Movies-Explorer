import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movieService/movie-service';
import { Movie } from '../../shared/models/movie';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: false,
  templateUrl: './banner.html',
  styleUrl: './banner.scss',
})
export class Banner implements OnInit {
  nowPlayingMovies!: Movie[];
  indx = 0;
  baseImgUrl = environment.tmdb_imageBaseUrl;
  currentMovie!: Movie;

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getNowPlayingMovies();
    // this.startCarousel();
  }

  getNowPlayingMovies() {
    this.movieService.getNowPlayingMovies().subscribe({
      next: (res) => {
        this.nowPlayingMovies = res.results.slice(0, 9);
        this.nowPlayingMovies = this.nowPlayingMovies.map((movie) => ({
          ...movie,
          genre_names: this.movieService.getGenreNames(movie.genre_ids),
        }));
        console.log(this.nowPlayingMovies);
        //Start carousel logic
        this.startCarousel();
      },
    });
  }

  startCarousel() {
    this.showMovieDetails(this.indx);

    setInterval(() => {
      this.indx++;

      if (this.indx >= this.nowPlayingMovies.length) {
        this.indx = 0;
      }

      this.showMovieDetails(this.indx);
    }, 4000);
  }

  showMovieDetails(indx: number) {
    let pannerImg = document.querySelector('.banner-image') as HTMLImageElement;
    let rating = document.querySelector('.rating-btn span') as HTMLSpanElement;
    let title = document.querySelector('.banner-title') as HTMLHeadElement;
    let desc = document.querySelector('.banner-description') as HTMLParagraphElement;

    let movie = this.nowPlayingMovies[indx];

    pannerImg.src = `${this.baseImgUrl}/w1280/${movie.backdrop_path}`;
    rating.textContent = movie.vote_average.toFixed(1);
    title.textContent = movie.title;
    desc.textContent = movie.overview;
    this.currentMovie = movie;
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
}
