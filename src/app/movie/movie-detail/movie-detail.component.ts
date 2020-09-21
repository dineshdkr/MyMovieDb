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

  isLoading = false;

  rated = false;

  guestSessionId = '';

  star10 = 'star10';
  star9half = 'star9half';
  star9 = 'star9';
  star8half = 'star8half';
  star8 = 'star8';
  star7half = 'star7half';
  star7 = 'star7';
  star6half = 'star6half';
  star6 = 'star6';
  star5half = 'star5half';
  star5 = 'star5';
  star4half = 'star4half';
  star4 = 'star4';
  star3half = 'star3half';
  star3 = 'star3';
  star2half = 'star2half';
  star2 = 'star2';
  star1half = 'star1half';
  star1 = 'star1';
  starhalf = 'starhalf';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        this.movieService.getMovie(this.id)
          .subscribe(
            data => {
              this.isLoading = false;
              this.movie = data;
              this.imageBasePath += data.poster_path;
              console.log(this.movie);
            },
            error => {
              this.isLoading = false;
              console.log(error);
            }
          );
      }
    );
  }

  getRating(event): void {
    this.rated = false;
    const rating = event.target.value;
    const session = JSON.parse(localStorage.getItem('guestSession'));
    console.log(session);
    if (!session || new Date(session.expires_at).getTime() < new Date().getTime()) {
      this.movieService.createSession().subscribe(
        data => {
          localStorage.setItem('guestSession', JSON.stringify(data));
          this.guestSessionId = data.guest_session_id;
        },
        error => {
          console.log(error);
          return;
        }
      );
    }
    else {
      this.guestSessionId = session.guest_session_id;
    }
    this.movieService.rateMovie(this.guestSessionId, +this.id, rating)
      .subscribe(
        data => {
          if (data.success) {
            this.rated = true;
          }
        }
      );
  }

  closeAlert(): void {
    this.rated = false;
  }
}
