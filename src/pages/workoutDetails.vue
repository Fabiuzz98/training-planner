<template>
  <base-message v-if="message" :messageType="errorType" @close="closeModal">{{
    message
  }}</base-message>
  <div class="container workout-details">
    <div class="workout-general-details">
      <div class="icon" v-if="authenticated">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 edit"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="deleteWorkout"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
      <training-type :mode="currentWorkout.workoutType"></training-type>
      <p>{{ currentWorkout.workoutType }}</p>
      <h3>{{ currentWorkout.title }}</h3>
    </div>
    <div class="workout-specific-details">
      <workout-specifics
        :idWorkout="id"
        v-for="(specific, index) in currentWorkout.exercises"
        :key="index"
        :id="index"
        :exerciseName="specific.exerciseName"
        :spec1="specific.spec1"
        :spec2="specific.spec2"
        :spec3="specific.spec3"
      ></workout-specifics>
    </div>
  </div>
</template>

<script>
import trainingType from '../ui/BaseIconTraining.vue';
import workoutSpecifics from '../ui/workoutSpecifics.vue';

export default {
  components: { trainingType, workoutSpecifics },
  props: ['id'],
  data() {
    return {
      currentWorkout: null,
      message: '',
      errorType: '',
    };
  },
  methods: {
    showChosenWorkout() {
      const workout = this.$store.getters['workoutModule/workouts'];
      const currentWorkoutID = this.$route.params.id;
      this.currentWorkout = workout.find(w => {
        return w.id === currentWorkoutID;
      });
    },

    async deleteWorkout() {
      await this.$store.dispatch('workoutModule/deleteWorkout', this.id);
      this.message = 'Workout deleted successfully 😊';
      this.errorType = 'success';

      setTimeout(() => {
        this.$router.replace('/');
      }, 2000);
    },

    closeModal() {
      this.message = '';
    },
  },
  created() {
    this.showChosenWorkout();
  },

  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped lang="scss">
.workout-details {
  margin-top: 4rem;
  max-width: 80rem;

  @media (max-width: 850px) {
    padding: 0 2rem;
  }

  .workout-general-details {
    padding: 3rem 7rem;
    background-color: #f1f1f1;
    border-radius: 8px;
    text-align: center;
    margin-bottom: 4rem;
    position: relative;

    .icon {
      padding-right: 5px;
      position: absolute;
      left: 20px;
      top: 20px;

      .edit {
        border-radius: 50%;
        border: 0.5px solid #44ba9f;
        width: 2.2rem;
        height: 2.2rem;
        color: #44ba9f;
        padding: 0.3rem;
        cursor: pointer;
        margin-right: 0.3rem;
        transition: all 0.3s;

        &:hover {
          background-color: #44ba9f;
          color: #f1f1f1;
        }
      }
    }

    p {
      font-size: 1.2rem;
      color: #ffffff;
      background-color: #44ba9f;
      margin-bottom: 2rem;
      border-radius: 8px;
      padding: 0.2rem 1.2rem;
      font-weight: 400;
      display: inline-block;
    }

    h3 {
      color: #44ba9f;
      font-size: 2.2rem;
      font-weight: 400;
      padding: 0 2rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      text-transform: capitalize;
    }
  }

  .workout-specific-details {
    padding: 3rem 5rem;
    background-color: #f1f1f1;
    border-radius: 8px;
    text-align: center;
    @media (max-width: 700px) {
      padding: 1.5rem 2rem;
    }
  }
}
</style>
