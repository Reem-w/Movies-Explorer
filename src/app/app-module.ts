import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'primeng/carousel';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslatePipe } from '@ngx-translate/core';

import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Banner } from './components/banner/banner';
import { Card } from './components/card/card';
import { CarouselSection } from './components/carousel-section/carousel-section';
import { Details } from './components/details/details';
import { MainPage } from './components/main-page/main-page';
import { Footer } from './components/footer/footer';
import { Explore } from './components/explore/explore';

@NgModule({
  declarations: [App, Navbar, Home, Banner, Card, CarouselSection, Details, MainPage, Footer, Explore],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    ToggleSwitchModule,
    FormsModule,
    MatIconModule,
    TranslatePipe,
    CarouselModule,
    HttpClientModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          // cssLayer: {
          //   name: 'primeng',
          //   // order: 'app-styles, primeng, another-css-library',
          //   order: 'primeng',
          // },
        },
      },
    }),

    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
