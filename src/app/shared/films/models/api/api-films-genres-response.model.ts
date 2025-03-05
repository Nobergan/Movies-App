export interface Genre {
  id: number;
  name: string;
}

export interface ApiFilmsGenresResponse {
  genres: Genre[];
}
