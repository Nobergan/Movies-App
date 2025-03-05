import { filmDetailsFeature } from '../reducers';

const {
  selectAddFilmCommentAction,
  selectAddFilmComment,
  selectFilmCommentsAction,
  selectFilmComments,
  selectGetFilmVotesAction,
  selectGetFilmVotes,
  selectFilmVotedAction,
  selectFilmVoted,
} = filmDetailsFeature;

export const FilmDetailsSelectors = {
  selectAddFilmCommentAction,
  selectAddFilmComment,
  selectFilmCommentsAction,
  selectFilmComments,
  selectGetFilmVotesAction,
  selectGetFilmVotes,
  selectFilmVotedAction,
  selectFilmVoted,
};
