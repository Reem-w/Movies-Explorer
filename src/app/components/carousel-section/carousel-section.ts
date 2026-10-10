import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-carousel-section',
  standalone: false,
  templateUrl: './carousel-section.html',
  styleUrl: './carousel-section.scss',
})
export class CarouselSection implements OnInit {
  @Input() Title: string = '';

  @Input() items!: Movie[];

  @Input() mutedTitle: boolean = false;

  // items = [{}, {}, {}, {}, {}, {}, {}];

  responsiveOptions: any[] | undefined;

  // constructor(private productService: ProductService) {}

  ngOnInit() {
    // this.productService.getProductsSmall().then((data) => {
    //   this.products = data.slice(0, 9);
    // });

    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 4,
        numScroll: 1,
      },

      {
        breakpoint: '767px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '320px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}
