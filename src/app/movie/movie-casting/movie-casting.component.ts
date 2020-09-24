import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { environment } from './../../../environments/environment';
import { MovieService } from '../movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-casting',
  templateUrl: './movie-casting.component.html',
  styleUrls: ['./movie-casting.component.css']
})
export class MovieCastingComponent implements OnInit {

  casts: Movie[];

  imageBasePath = environment.FILE_PATH;

  id: number;
  isLoading = false;
  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.id = +params.id;
        this.movieService.getCastedFilms(this.id)
          .subscribe(
            data => {
              this.isLoading = false;
              this.casts = data.cast;
              console.log(data.cast);
            }
          );
      }
    );
  }
}

