// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // Firebase API
  firebaseRegisterAPI: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=',
  firebaseLoginAPI: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebaseForgotPasswordAPI: 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=',
  firebaseGetCurrentUserAPI: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=',
  firebaseConfig: {
    apiKey: 'AIzaSyAqdujlQZHO_4jqkGoX3LfAawj6fbqQD7Q',
    authDomain: 'mix-movie-4db73.firebaseapp.com',
    databaseURL: 'https://mix-movie-4db73-default-rtdb.firebaseio.com',
    projectId: 'mix-movie-4db73',
    storageBucket: 'mix-movie-4db73.firebasestorage.app',
    messagingSenderId: '825500941616',
    appId: '1:825500941616:web:fa327b7f09a05816719cf5',
    measurementId: 'G-VJR5XHFTJM',
  },

  // TMDB API
  tmdbAPIKey: '7d83a9be9a9fe9af97206c0d9c68ee68',
  tmdbBaseFilmsUrlAPI: `https://api.themoviedb.org/3/`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
