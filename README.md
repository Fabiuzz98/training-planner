# training-planner

BUILT WITH: <br>
This application is fully responsive and has been made with Vue-js, HTML, SCSS and Firebase for the backend.

TRY THIS APP HERE: <br>
... in process

DESCRIPTION OF THE APP: <br>
This app allows unauthenticated users to see the list of workouts and by clicking on them their details. <br>
The user has the possibility to register and thus obtain the authorization to create a new workout choosing between two types: cardio or strength.
Based on the workout type chosen will then appear a different form to fill in. It's also possible to add more than one exercise for each workout. <br>
At this point the created workout will appear in the home page where you can click on it and based on if you're authenticated or not, it's possible to make changes at the exercises by updating them or even delete the entire workout. <br>

MORE ABOUT THE APP: <br>
The app is FULLY RESPONSIVE, provided with error handling and a function that will auto-logout after a given time from the authentication. <br>
Thanks to Vue js, the app uses components, routing, vuex and many fetch API to interact with Firebase. It also has features as redirecting a user to different URLs if trying to access pages which is not allowed to visit and keeps you logged in if you refresh the page (and the auto logout timer hasn't expired of course).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
