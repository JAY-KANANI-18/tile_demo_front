// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // URL : 'http://65.1.238.129',
  URL : 'http://194.238.26.214:5000',    
  // URL : 'http://127.0.0.1:5000',    
  // URL : 'https://imgstockhub.in',
  // Socket : 'ws://127.0.0.1:8000',
  Socket : 'http://194.238.26.214:5000',
  // Socket : 'http://127.0.0.1:5000',
  // Socket : 'wss://imgstockhub.in',
  stripe: {
    // apiKey: 'pk_test_51N45EpSAETG1lrtoGx6ndq4U7XSTTzKA8lZk0RgfHqhqdNql2DMifnExHs47haeBFRSqThvEfU9M2CeOA6vHOquU00LLyJoust'
    apiKey: 'pk_test_51N2piRJAU9zBfSBOixMp53BIFUU3aFXpACWos1Lvi2aM8H984bRSIf1aVoloiRnQNVCWU0Ckyg6SWuYyyXwlDT8000xGZO12wf'
  },
  firebaseConfig: {
    apiKey: "AIzaSyCHk1QsDZ0R6cnKY011100ylciMufQjqto",
  authDomain: "godrive-9e426.firebaseapp.com",
  projectId: "godrive-9e426",
  storageBucket: "godrive-9e426.appspot.com",
  messagingSenderId: "1079628430087",
  appId: "1:1079628430087:web:f963c478544f6d295fe3a2",
  measurementId: "G-2HYGM8Z8H3"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
