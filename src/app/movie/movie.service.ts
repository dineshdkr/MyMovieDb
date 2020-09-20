import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Movie } from './movie.model';


@Injectable()
export class MovieService {

  movieListApi = `${environment.API_BASE_URL}3/search/movie?api_key=${environment.API_KEY}&query=`;

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
    .get<Movie>(this.movieDetailApi + id + '?api_key=' + environment.API_KEY)
    .pipe(catchError((this.errorHandler)));
  }

  private errorHandler(error: HttpErrorResponse) {
    console.log(error.status);
    return throwError(error.statusText || 'Error');
  }
}
