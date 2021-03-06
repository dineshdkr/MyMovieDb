import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Movie } from './movie.model';
import { RatedMovies } from './rated-movie.model';
import { Casting } from './cating.models';


export interface Session {
  guest_session_id: string;
  expires_at: string;
}

@Injectable()
export class MovieService {

  movieListApi = `${environment.API_BASE_URL}3/search/movie?query=`;

  movieDetailApi = `${environment.API_BASE_URL}3/movie/`;

  constructor(private http: HttpClient) { }

  getMovies(keyword: string) {
    return this.http
      .get<{results: Movie[]}>(this.movieListApi + keyword)
      .pipe(
        catchError((this.errorHandler))
      );
  }

  getMovie(id: string) {
    return this.http
    .get<Movie>(this.movieDetailApi + id)
    .pipe(catchError((this.errorHandler)));
  }

  createSession() {
    return this.http
      .get<Session>(environment.API_BASE_URL + '3/authentication/guest_session/new')
      .pipe(catchError(this.errorHandler));
  }

  rateMovie(sessionId: string, movieId: number, rating: number) {
    const api = environment.API_BASE_URL + '3/movie/' + movieId + '/rating?guest_session_id=' + sessionId;
    return this.http
      .post<{success: boolean, status_message: string}>(api, {value: rating})
      .pipe(catchError((this.errorHandler)));
  }

  getRatedMovies(sessionId: string) {
    const api = environment.API_BASE_URL + '3/guest_session/' + sessionId + '/rated/movies';
    return this.http
      .get<{results: RatedMovies[]}>(api)
      .pipe(catchError((this.errorHandler)));
  }

  getCasting(id: string) {
    const api = this.movieDetailApi + id + '/credits';
    return this.http
      .get<{cast: Casting[]}>(api)
      .pipe(catchError((this.errorHandler)));
  }

  getCastedFilms(personId: number) {
    const api = `${environment.API_BASE_URL}3/person/${personId}/movie_credits`;
    return this.http
      .get<{cast: Movie[]}>(api)
      .pipe(catchError((this.errorHandler)));
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error.status);
    return throwError(error.statusText || 'Error');
  }

}
