import { Component, inject, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/movie';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input() movie!: Movie;
  router = inject(Router);
  imageBaseUrl = environment.tmdb_imageBaseUrl;
}
