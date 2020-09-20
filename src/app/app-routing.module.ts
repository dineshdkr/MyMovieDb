import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: 'movies',
    component: MovieListComponent
  },
  {
    path: 'movies/:id',
    component: MovieDetailComponent
  },
  { path: '**', redirectTo: '' }, // Wildcard routing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
