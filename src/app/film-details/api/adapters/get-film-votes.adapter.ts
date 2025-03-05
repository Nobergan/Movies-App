import { FilmVotesResponse } from '../../models';

const fromApiGetFilmVotes = (votes: FilmVotesResponse): FilmVotesResponse => ({
  likes: votes && votes.likes ? votes.likes : 0,
  dislikes: votes && votes.dislikes ? votes.dislikes : 0,
});

export const GetFilmVotesAdapter = {
  fromApiGetFilmVotes,
};
