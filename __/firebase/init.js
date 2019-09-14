  // Initialize Firebase
  var config = {
    apiKey: "<API-KEY>",
    authDomain: "ouch-beta-mobile.firebaseapp.com",
    databaseURL: "https://<PROJECT-ID>.firebaseio.com",
    projectId: "<PROJECT-ID>",
    storageBucket: "<PROJECT-ID>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
  };
  firebase.initializeApp(config);

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      // List of OAuth providers supported.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // Other config options...
  });