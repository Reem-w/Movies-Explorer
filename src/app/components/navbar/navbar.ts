import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/themeService/theme-service';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from '../../shared/models/movie';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MovieService } from '../../shared/services/movieService/movie-service';

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
  searchResults: Movie[] = [];
  baseImgUrl = environment.tmdb_imageBaseUrl;

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService,
    private router: Router,
    private movieService: MovieService,
  ) {}

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

  onSearchInput(): void {
    this.movieService.searchMovie(this.searchQuery).subscribe({
      next: (res) => {
        this.searchResults = res.results;
      },
      error: (err) => {
        console.error('Failed to fetch popular movies:', err);
      },
    });
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
