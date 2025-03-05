import { FilmComment } from '../../models';

const fromApiGetFilmComments = (comments: any): FilmComment[] => {
  if (!comments) return [];

  return Object.keys(comments).map(key => ({
    id: key,
    comment: comments[key].comment.comment || null,
    date: comments[key].date ? new Date(comments[key].date).toISOString() : null,
  }));
};

export const GetFilmCommentsAdapter = {
  fromApiGetFilmComments,
};
