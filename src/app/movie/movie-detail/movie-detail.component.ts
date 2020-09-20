import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from './../../../environments/environment';
import { Movie } from '../movie.model';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  imageBasePath = environment.FILE_PATH;
  movie: Movie;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.movieService.getMovie(this.id)
          .subscribe(
            data => {
              this.movie = data;
              this.imageBasePath += data.poster_path;
              console.log(this.movie);
            }
          );
      }
    );
  }
}
