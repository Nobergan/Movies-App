import { FilmComment } from '@mm/details';

import { AsyncActionState } from '../models';

export const filmDetailsFeatureKey = 'Film details';

export interface FilmDetailsState {
  addFilmCommentAction: AsyncActionState<FilmComment>;
  addFilmComment: FilmComment;
  filmCommentsAction: AsyncActionState<FilmComment[]>;
  filmComments: FilmComment[];
  addFilmVoteAction: AsyncActionState<{
    likes: number;
    dislikes: number;
  }>;
  addFilmVote: { likes: number; dislikes: number };
  getFilmVotesAction: AsyncActionState<{
    likes: number;
    dislikes: number;
  }>;
  getFilmVotes: {
    likes: number;
    dislikes: number;
  };
  filmVotedAction: AsyncActionState<{
    isLiked: boolean;
    isDisliked: boolean;
  }>;
  filmVoted: {
    isLiked: boolean;
    isDisliked: boolean;
  };
}
