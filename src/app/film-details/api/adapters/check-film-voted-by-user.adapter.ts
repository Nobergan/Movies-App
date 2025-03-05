import { IsFilmVotedResponse } from '../../models';

const fromApiCheckFilmVotedByUser = (isVoted: IsFilmVotedResponse): IsFilmVotedResponse => ({
  isLiked: isVoted && isVoted.isLiked ? isVoted.isLiked : null,
  isDisliked: isVoted && isVoted.isDisliked ? isVoted.isDisliked : null,
});

export const CheckFilmVotedByUserAdapter = {
  fromApiCheckFilmVotedByUser,
};
