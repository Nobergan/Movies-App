import { Injector } from '@angular/core';

import { FilmResponse, FilmsType, FILTERS_KEY, Genre } from '@mm/shared/films/models';
import { SessionStorageService } from '@mm/shared/services';
import { MixMovieContentRoute, MixMoviePage } from '@mm/shared/common/models';

export function mapGenresToFilms(films: FilmResponse[], genres: Genre[]): FilmResponse[] {
  return films?.map((film: FilmResponse): FilmResponse => {
    const genreNames: string[] = film.genreIds?.map((genreId: number): string => {
      const genre: Genre = genres.find((genre: Genre): boolean => genre.id === genreId);
      return genre ? genre.name : '';
    });

    return { ...film, genres: genreNames };
  });
}

export const shouldShowFiltersButton = (injector: Injector, moviePage: string, route?: MixMovieContentRoute) => {
  const sessionStorage = injector.get(SessionStorageService);

  if (moviePage === MixMoviePage.Movies || moviePage === MixMoviePage.Tv) {
    return !!sessionStorage.get(moviePage + (route ? route : '') + FILTERS_KEY);
  }

  return false;
};

export function scrollToTopBlock(targetElement: HTMLElement) {
  const headerElement = document.querySelector('.header');

  window.scrollTo({
    top: window.scrollY + targetElement.getBoundingClientRect().top - headerElement.clientHeight,
    behavior: 'smooth',
  });
}

export function getFilmIdsByMediaType(mediaType: FilmsType, favouriteFilms: FilmResponse[], favouriteTv: FilmResponse[]): number[] {
  const mediaTypeToCollectionMap = {
    [FilmsType.Movie]: favouriteFilms,
    [FilmsType.Tv]: favouriteTv,
  };

  const selectedCollection = mediaTypeToCollectionMap[mediaType] || [];
  return selectedCollection.map((item: FilmResponse) => item.filmId);
}
