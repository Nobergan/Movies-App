export interface FilmIsVotedRequest {
  userLocalId: string;
  filmId: number;
  isLiked: boolean;
  isDisliked: boolean;
}
