import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PaginatedResponse } from '../../models/paginated-response';
import { Credits, Movie, MovieDetails } from '../../models/movie';
import { MOVIE_GENRES } from '../../constants/movie-genres';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  httpClient = inject(HttpClient);

  baseUrl = environment.tmdb_baseUrl;
  apiKey = environment.tmdb_apiKey;

  // search/movie
  searchMovie(movieName: any) {
    return this.httpClient.get<PaginatedResponse<Movie>>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: movieName,
      },
    });
  }

  getNowPlayingMovies() {
    return this.httpClient.get<PaginatedResponse<Movie>>(`${this.baseUrl}/movie/now_playing`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getPopularMovies() {
    return this.httpClient.get<PaginatedResponse<Movie>>(`${this.baseUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getTopRatedMovies() {
    return this.httpClient.get<PaginatedResponse<Movie>>(`${this.baseUrl}/movie/top_rated`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getMovieDetailsById(id: number) {
    return this.httpClient.get<MovieDetails>(`${this.baseUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getSimilarMovies(movie_id: number) {
    return this.httpClient.get<PaginatedResponse<Movie>>(
      `${this.baseUrl}/movie/${movie_id}/similar`,
      {
        params: {
          api_key: this.apiKey,
        },
      },
    );
  }

  getCast(movie_id: number) {
    return this.httpClient.get<Credits>(`${this.baseUrl}/movie/${movie_id}/credits`, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  getGenreNames(genreIds: number[]): string[] {
    return genreIds
      .map((id) => MOVIE_GENRES.find((g) => g.id === id)?.name)
      .filter((name) => name !== undefined);
  }
}
