export default {
  namespaced: true,

  state() {
    return {
      workouts: [
        // {
        //   id: 0,
        //   workoutType: 'cardio',
        //   title:
        //     'test1      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus illum accusamus earum dolorum id ipsum exercitationem rem, delectus doloribus? Consectetur omnis ab reprehenderit quaerat ipsa officia itaque, odio iure quidem!',
        //   exercises: [
        //     { exerciseName: 'fly', spec1: 9, spec2: 4, spec3: 130 },
        //     {
        //       exerciseName: 'push down at the machine',
        //       spec1: 19,
        //       spec2: 44,
        //       spec3: 10,
        //     },
        //     {
        //       exerciseName: 'chest press',
        //       spec1: 39,
        //       spec2: 478,
        //       spec3: 13034,
        //     },
        //   ],
        // },
        // {
        //   id: 1,
        //   workoutType: 'strenght',
        //   title: 'test2',
        //   exercises: [
        //     { exerciseName: 'fly', spec1: 9, spec2: 4, spec3: 130 },
        //     {
        //       exerciseName: 'push down at the machine',
        //       spec1: 19,
        //       spec2: 44,
        //       spec3: 10,
        //     },
        //     {
        //       exerciseName: 'chest press',
        //       spec1: 39,
        //       spec2: 478,
        //       spec3: 13034,
        //     },
        //   ],
        // },
      ],
    };
  },
  mutations: {
    addNewWorkout(state, payload) {
      state.workouts = payload;
    },
  },
  actions: {
    async loadWorkouts(context) {
      const response = await fetch(
        'https://training-planner-7ff67-default-rtdb.firebaseio.com/workouts.json'
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(responseData.message);
        throw err;
      }

      const workouts = [];

      for (const key in responseData) {
        const workout = {
          id: key,
          workoutType: responseData[key].workoutType,
          title: responseData[key].title,
          exercises: responseData[key].exercises,
        };
        workouts.push(workout);
      }

      if (workouts.length === 0) return;
      console.log(workouts);

      context.commit('addNewWorkout', workouts);
    },

    async addNewWorkout(context, payload) {
      const token = context.rootState.token;

      const response = await fetch(
        `https://training-planner-7ff67-default-rtdb.firebaseio.com/workouts.json?auth=${token}`,
        { method: 'POST', body: JSON.stringify(payload) }
      );

      if (!response.ok) {
        new Error('Failed to fetch');
      }
    },

    async update(context, payload) {
      const token = context.rootState.token;

      const workoutID = payload.idWorkout;

      const response = await fetch(
        `https://training-planner-7ff67-default-rtdb.firebaseio.com/workouts/${workoutID}/exercises/${payload.id}.json?auth=${token}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            exerciseName: payload.exerciseName,
            spec1: payload.spec1,
            spec2: payload.spec2,
            spec3: payload.spec3,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const err = new Error(response.message);
        throw err;
      }

      console.log(responseData);
    },

    async deleteWorkout(context, payload) {
      const token = context.rootState.token;

      await fetch(
        `https://training-planner-7ff67-default-rtdb.firebaseio.com/workouts/${payload}.json?auth=${token}`,
        { method: 'DELETE' }
      );
    },
  },
  getters: {
    workouts(state) {
      return state.workouts;
    },
  },
};
