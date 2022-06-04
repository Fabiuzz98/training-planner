<template>
  <section class="container">
    <div class="workouts" v-if="workouts.length !== 0">
      <workouts-list
        v-for="workout in workouts"
        :key="workout.title"
        :id="workout.id"
        :title="workout.title"
        :type="workout.workoutType"
      ></workouts-list>
    </div>

    <p v-if="workouts.length === 0 && !error">{{ message }}</p>

    <p v-if="error">{{ error }}</p>
  </section>
</template>

<script>
import workoutsList from '../layout/workoutsList.vue';

export default {
  components: { workoutsList },

  data() {
    return {
      thereIsWorkout: null,
      message:
        'The workouts will appear here, so go ahead and add one after creating an account',

      error: '',
    };
  },

  methods: {
    async loadWorkouts() {
      try {
        await this.$store.dispatch('workoutModule/loadWorkouts');
      } catch (err) {
        this.error = err;
      }
    },
  },

  created() {
    this.loadWorkouts();
  },

  computed: {
    workouts() {
      return this.$store.getters['workoutModule/workouts'];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 120rem;

  p {
    background-color: #f1f1f1;
    color: #44ba9f;
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    padding: 4rem 2rem;
    border-radius: 5px;
    margin-top: 10rem;
    @media (max-width: 800px) {
      margin: 4rem 4rem 0 4rem;
    }
  }
  .workouts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 1.5rem;
    justify-items: center;
    align-items: center;
    margin-top: 4rem;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 980px) {
      grid-template-columns: repeat(2, 1fr);
      justify-items: space-around;
      align-items: center;
    }
    @media (max-width: 670px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
