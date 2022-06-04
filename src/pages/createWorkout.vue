<template>
  <base-message v-if="message" :messageType="errorType" @close="closeModal">{{
    message
  }}</base-message>
  <div class="container">
    <h2>Record Workout</h2>
    <form action="">
      <div class="column">
        <label for="">Workout Title</label>
        <input type="text" name="" id="" v-model="title" />
      </div>
      <div class="column">
        <label for="">Workout Type</label>
        <select v-model="workoutType" @change="getWorkoutSelection">
          <option value="" selected disabled hidden>
            Select workout type...
          </option>
          <option value="cardio">cardio</option>
          <option value="strength">strength</option>
        </select>
      </div>
      <div v-if="cardio">
        <div
          class="workout-cardio-details"
          v-for="(item, index) in exercises"
          :key="index"
        >
          <div class="column workout-name">
            <label for="">Workout Name</label>
            <input type="text" v-model="item.exerciseName" />
          </div>
          <div class="column">
            <label for="">Distance</label>
            <input type="text" v-model="item.distance" />
          </div>
          <div class="column">
            <label for="">Duration</label>
            <input type="text" v-model="item.duration" />
          </div>
          <div class="column">
            <label for="">Pace</label>
            <input type="text" v-model="item.pace" />
          </div>
        </div>
        <button @click.prevent="addExercise">Add Exercise</button>
      </div>
      <div v-if="strength">
        <div
          class="workout-strength-details"
          v-for="(item, index) in exercises"
          :key="index"
        >
          <div class="column workout-name">
            <label for="">Workout Name</label>
            <input type="text" v-model="item.exerciseName" />
          </div>
          <div class="column">
            <label for="">Sets</label>
            <input type="number" v-model="item.sets" />
          </div>
          <div class="column">
            <label for="">Repetitions</label>
            <input type="number" v-model="item.reps" />
          </div>
          <div class="column">
            <label for="">Weight (kg)</label>
            <input type="number" v-model="item.weight" />
          </div>
        </div>
        <button @click.prevent="addExercise">Add Exercise</button>
      </div>
      <p v-if="errorMsg" class="error-message">{{ errorMsg }}</p>
      <button class="submit-form" @click.prevent="submitForm">
        Save Exercise
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      workoutType: '',
      cardio: null,
      strength: null,
      title: '',
      exercises: [],
      errorMsg: '',
      message: '',
      errorType: '',
    };
  },

  methods: {
    getWorkoutSelection() {
      this.cardio = null;
      this.strength = null;
      this.exercises = [];

      if (this.workoutType === 'cardio') {
        this.cardio = true;
      } else {
        this.strength = true;
      }
      this.addExercise();
    },

    addExercise() {
      // const date = new Date().getTime().toString();
      // const id = +date.slice(3);

      if (this.workoutType === 'strength') {
        this.exercises.push({
          exerciseName: '',
          sets: '',
          reps: '',
          weight: '',
        });
        return;
      } else {
        this.exercises.push({
          exerciseName: '',
          distance: '',
          duration: '',
          pace: '',
        });
        return;
      }
    },
    async submitForm() {
      const exercises = [];

      if (
        this.exercises.length === 0 ||
        this.workoutType === '' ||
        this.title === ''
      ) {
        this.errorMsg =
          'You have to fill some of the fields to save the workout';

        return;
      }

      if (this.workoutType === 'strength') {
        for (const key of this.exercises) {
          const workoutSpecifics = {
            exerciseName: key.exerciseName,
            spec1: key.sets,
            spec2: key.reps,
            spec3: key.weight,
          };
          exercises.push(workoutSpecifics);
        }
      } else {
        for (const key of this.exercises) {
          const workoutSpecifics = {
            exerciseName: key.exerciseName,
            spec1: key.distance,
            spec2: key.duration,
            spec3: key.pace,
          };
          exercises.push(workoutSpecifics);
        }
      }

      const workout = {
        workoutType: this.workoutType,
        title: this.title,
        exercises: exercises,
      };

      await this.$store.dispatch('workoutModule/addNewWorkout', workout);

      this.message = 'Workout created successfully 😊';
      this.errorType = 'success';

      setTimeout(() => {
        this.$router.replace('/');
      }, 2000);
    },

    closeModal() {
      this.message = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 4rem;
  max-width: 80rem;
  padding: 3rem 7rem;
  background-color: #f1f1f1;
  border-radius: 8px;
  text-align: start;
  margin-bottom: 4rem;
  @media (max-width: 800px) {
    margin: 4rem 4rem 0 4rem;
  }
  @media (max-width: 750px) {
    .workout-cardio-details {
      flex-direction: column;

      margin-top: 2.5rem;
    }
    .workout-strength-details {
      flex-direction: column;
      margin-top: 2.5rem;
    }
  }

  h2 {
    color: #44ba9f;
    font-size: 2.8rem;
    font-weight: 500;
    margin-bottom: 1.5rem;
  }

  form {
    .submit-form {
      font-size: 1.6rem;
      color: #f4f4f4;
      border-color: #f4f4f4;
      background-color: #69c8b2;
      margin-top: 2rem;

      &:hover {
        color: #69c8b2;
        border-color: #69c8b2;
        background-color: #f4f4f4;
      }
    }
    .workout-cardio-details {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      gap: 2.5rem;
      flex: 1;

      .column {
        flex: 1;

        input {
          width: 100%;
        }
      }

      .workout-name {
        flex: 2;
      }
    }

    .workout-strength-details {
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      gap: 2.5rem;
      flex: 1;

      .column {
        flex: 1;

        input {
          width: 100%;
        }
      }

      .workout-name {
        flex: 2;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;

      label {
        color: #44ba9f;
        font-size: 1.4rem;
      }

      select {
        border: none;
        font-size: 1.6rem;

        option {
          border-radius: 5px;
          border: none;
          font-size: 1.2rem;

          &:focus {
            font-size: 1.4rem;
            outline: 1px solid #44ba9f;
            color: #44ba9f;
          }
        }
      }

      input {
        border-radius: 5px;
        border: none;
        font-size: 1.6rem;

        &:focus {
          outline: 1px solid #44ba9f;
        }
      }
    }

    .error-message {
      color: red;
      font-size: 1.6rem;
      margin-top: 1rem;
    }

    button {
      font-size: 1.2rem;
      padding: 0.5rem 1rem;
      border: 1px solid #44ba9f;
      border-radius: 5px;
      color: #44ba9f;
      cursor: pointer;
      transition: all 0.4s;

      &:hover {
        color: #f4f4f4;
        border-color: #f4f4f4;
        background-color: #69c8b2;
      }
    }
  }
}
</style>
