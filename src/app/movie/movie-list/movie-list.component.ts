import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  movies: Movie[];

  imageBasePath = environment.FILE_PATH;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (queryParam: Params) => {
        const search = queryParam.search;
        if (search) {
          this.movieService.getMovies(search).subscribe(
            data => {
              this.movies = data.results;
            },
            error => {
              console.log(error);
            }
          );
        }
      }
    );
  }
}
