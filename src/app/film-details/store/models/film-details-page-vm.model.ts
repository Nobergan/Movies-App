import { FilmsResponse, Genre } from '@mm/shared/films/models';
import { AuthPopupType } from '@mm/auth/models';

import { FilmComment, FilmDetailsResponse } from '../../models';

export interface FilmDetailsPageVmModel {
  isLoggedIn: boolean;
  authPopupOpen: AuthPopupType;
  details: FilmDetailsResponse;
  comments: FilmComment[];
  isLoadingComments: boolean;
  likes: number;
  dislikes: number;
  isLiked: boolean;
  isDisliked: boolean;
  isLoading: boolean;
  filmsSimilar: FilmsResponse;
  genres: Genre[];
  favouriteFilmsIds: number[];
}
