import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storedKey: string = 'movie-explorer-theme';

  constructor() {
    this.initializeTheme();
  }

  initializeTheme(): void {
    if (localStorage.getItem(this.storedKey) === 'light') {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  setDarkTheme(): void {
    document.documentElement.classList.add('dark');
    localStorage.setItem(this.storedKey, 'dark');
  }

  setLightTheme(): void {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(this.storedKey, 'light');
  }

  toggleTheme(): void {
    if (document.documentElement.classList.contains('dark')) {
      this.setLightTheme();
      // console.log('from toggleTheme() Theme changed to light');
    } else {
      this.setDarkTheme();
      // console.log('from toggleTheme() Theme changed to dark');
    }
  }

  isDarkThemeOn(): boolean {
    return document.documentElement.classList.contains('dark');
  }
}
