import { createStore } from 'vuex';
import workoutsModule from './workouts/index.js';
import router from '../router.js';

const store = createStore({
  modules: { workoutModule: workoutsModule },

  state() {
    return {
      id: '',
      token: '',
    };
  },
  mutations: {
    setUser(state, payload) {
      state.id = payload.id;
      state.token = payload.token;
    },

    setStorage(_, payload) {
      console.log(payload.logoutDate);
      const userData = [payload.id, payload.token, payload.logoutDate];
      localStorage.setItem('userLoginData', JSON.stringify(userData));
    },

    logout(state) {
      state.id = '';
      state.token = '';
      localStorage.clear();
      router.replace('/');
    },
  },
  actions: {
    async signUp(context, payload) {
      console.log(payload);

      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5z3ixxb0EXbzCwemqjZeGoQDU_BeHCSM',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message);
        throw err;
      }

      const expirationTime = responseData.expiresIn * 1000; //Time in ms before expiration
      const currentDate = new Date().getTime();
      const logoutFutureDate = currentDate + expirationTime; //Time in ms of expiration

      const credentials = {
        id: responseData.localId,
        token: responseData.idToken,
        logoutDate: logoutFutureDate,
      };

      context.commit('setUser', credentials);
      context.commit('setStorage', credentials);

      setTimeout(function () {
        context.commit('logout');
      }, expirationTime);
    },

    async login(context, payload) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5z3ixxb0EXbzCwemqjZeGoQDU_BeHCSM',
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message);
        throw err;
      }

      const expirationTime = responseData.expiresIn * 1000;
      const currentDate = new Date().getTime();
      const logoutFutureDate = currentDate + expirationTime;

      const credentials = {
        id: responseData.localId,
        token: responseData.idToken,
        logoutDate: logoutFutureDate,
      };

      context.commit('setUser', credentials);
      context.commit('setStorage', credentials);

      setTimeout(function () {
        context.commit('logout');
      }, expirationTime);
    },

    logout(context) {
      context.commit('logout');
    },

    tryLogin(context) {
      const userData = JSON.parse(localStorage.getItem('userLoginData'));
      if (!userData) return;
      const userLoginData = { id: userData[0], token: userData[1] };
      const logoutDate = userData[2];
      const timeBeforeLogout = logoutDate - new Date().getTime();

      if (timeBeforeLogout <= 10000) {
        context.commit('logout');
      } else {
        setTimeout(() => {
          context.commit('logout');
        }, timeBeforeLogout);
      }

      context.commit('setUser', userLoginData);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },
});

export default store;
