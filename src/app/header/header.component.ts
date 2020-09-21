import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.router.navigate(['movies'], { queryParams: { search: this.searchText } });
  }

  onViewRated(): void {
    this.router.navigate(['ratedMovies']);
  }

}
