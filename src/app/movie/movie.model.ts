export class Movie {
  title: string;
  popularity: number;
  vote_count: number;
  poster_path: string;
  id: number;
  original_title: string;
  vote_average: number;
  overview: string;

  constructor(
    title: string,
    popularity: number, voteCount: number, posterPath: string,
    id: number,
    originalTitle: string, voteAverage: number, overview: string
  ) {
      this.title = title;
      this.popularity = popularity;
      this.vote_count = voteCount;
      this.poster_path = posterPath;
      this.id = id;
      this.original_title = originalTitle;
      this.vote_average = voteAverage;
      this.overview = overview;
  }
}
