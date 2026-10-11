import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/themeService/theme-service';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from '../../shared/models/movie';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MovieService } from '../../shared/services/movieService/movie-service';
import { catchError, debounceTime, distinctUntilChanged, map, of, Subject, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isDarkMode: boolean = true;
  language: string = localStorage.getItem('movie-explorer-language') || 'en';
  isSearchOpen = false;
  searchQuery = '';
  baseImgUrl = environment.tmdb_imageBaseUrl;
  searchResults: Movie[] = [];
  private searchSubject = new Subject<string>();

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private router: Router,
    private movieService: MovieService,
  ) {
    this.searchSubject
      .pipe(
        map((query) => query.trim()),

        debounceTime(1000),

        distinctUntilChanged(),

        switchMap((query) => {
          return this.movieService.searchMovie(query).pipe(
            map((res) => res.results),
            catchError((err) => {
              console.error('Failed to fetch popular movies:', err);
              return of([]);
            }),
          );
        }),

        takeUntilDestroyed(),
      )
      .subscribe((results) => {
        this.searchResults = results;
      });
  }

  ngOnInit(): void {
    this.isDarkMode = this.themeService.isDarkThemeOn();
    // this.translate.use(this.language.toLowerCase());
  }

  changeLanguage(lang: string = this.language): void {
    this.language = lang;
    localStorage.setItem('movie-explorer-language', lang);
    this.translate.use(lang.toLowerCase());
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkMode = this.themeService.isDarkThemeOn();
    // console.log(` isDarkMode: ${this.isDarkMode}`);
  }

  onSearchInput(query: string): void {
    // this.movieService.searchMovie(this.searchQuery).subscribe({
    //   next: (res) => {
    //     this.searchResults = res.results;
    //   },
    //   error: (err) => {
    //     console.error('Failed to fetch popular movies:', err);
    //   },
    // });
    this.searchSubject.next(query);
  }

  openSearchModal(): void {
    this.isSearchOpen = true;
  }

  closeSearchModal(): void {
    this.isSearchOpen = false;
  }

  openMovie(id: number): void {
    this.closeSearchModal();
    this.searchQuery = '';
    this.searchResults = [];
    this.router.navigate(['/details', id]);
  }
}
