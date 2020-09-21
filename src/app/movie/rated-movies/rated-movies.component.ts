import { Component, OnInit } from '@angular/core';

import { environment } from './../../../environments/environment';
import { RatedMovies } from '../rated-movie.model';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css']
})
export class RatedMoviesComponent implements OnInit {

  ratedMovies: RatedMovies[];
  imageBasePath = environment.FILE_PATH;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    const session = JSON.parse(localStorage.getItem('guestSession'));
    if (!session) {
      alert('You have not rated any movies yet');
      return;
    }
    const sessionId = session.guest_session_id;
    this.movieService.getRatedMovies(sessionId)
      .subscribe(
        data => {
          this.ratedMovies = data.results;
          console.log(this.ratedMovies);
        },
        error => {
          console.log(error);
        }
      );
  }
}