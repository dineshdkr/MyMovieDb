import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from './../../../environments/environment';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];

  isLoading = false;

  imageBasePath = environment.FILE_PATH;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.queryParams.subscribe(
      (queryParam: Params) => {
        const search = queryParam.search;
        if (search) {
          this.movieService.getMovies(search).subscribe(
            data => {
              this.isLoading = false;
              this.movies = data.results;
            },
            error => {
              this.isLoading = false;
              console.log(error);
            }
          );
        }
      }
    );
  }
}
