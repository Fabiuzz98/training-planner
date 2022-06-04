import { createRouter, createWebHistory } from 'vue-router';

import home from './pages/homePage.vue';
import workoutDetails from './pages/workoutDetails.vue';
import createWorkout from './pages/createWorkout.vue';
import authenticationPage from './pages/authenticationPage.vue';

import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      redirect: '/home',
    },

    {
      path: '/home',
      component: home,
      name: 'home',
      meta: { title: 'Home' },
    },
    {
      path: '/home/:id/details',
      component: workoutDetails,
      props: true,
      meta: { title: 'Workout Details' },
    },
    {
      path: '/create-workout',
      component: createWorkout,
      name: 'createWorkout',
      meta: { title: 'Create Workout', requiresAuth: true },
    },
    {
      path: '/authentication',
      component: authenticationPage,
      name: 'authenticationPage',
      meta: { title: 'Authentication', requiresUnauth: true },
    },
  ],
});

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title} | Training Planner`;
  next();
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/authentication');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
