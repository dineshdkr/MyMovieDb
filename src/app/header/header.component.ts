import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../movie/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText = '';

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate(['movies'], { queryParams: { search: this.searchText } });
  }

}
