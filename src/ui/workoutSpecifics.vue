<template>
  <div v-if="message">
    <p class="message">{{ message }}</p>
    <button class="close-message" @click="closeMessage">ok</button>
  </div>
  <div v-else class="specifics-container">
    <div class="specifics">
      <div class="icon" v-if="authenticated">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 edit"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          @click="modify"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
      <div class="column exercise-name">
        <h4>Exercise</h4>
        <p v-if="!showInput">{{ exerciseName }}</p>
        <input v-else type="text" v-model="name" />
      </div>
      <div class="column">
        <h4>Sets</h4>
        <p v-if="!showInput">{{ spec1 }}</p>
        <input v-else type="text" v-model="spec01" />
      </div>
      <div class="column">
        <h4>Repetitions</h4>
        <p v-if="!showInput">{{ spec2 }}</p>
        <input v-else type="text" v-model="spec02" />
      </div>
      <div class="column">
        <h4>Weight (Kg)</h4>
        <p v-if="!showInput">{{ spec3 }}</p>
        <input v-else type="text" v-model="spec03" />
      </div>
    </div>
    <button v-if="showInput" @click="update">Update</button>
  </div>
</template>

<script>
export default {
  props: ['exerciseName', 'spec1', 'spec2', 'spec3', 'id', 'idWorkout'],
  data() {
    return {
      showInput: null,
      name: '',
      spec01: '',
      spec02: '',
      spec03: '',
      message: null,
    };
  },
  methods: {
    modify() {
      this.showInput = !this.showInput;
    },

    closeMessage() {
      this.message = null;
    },

    async update() {
      const updatedExercise = {
        exerciseName: this.name,
        id: this.id,
        spec1: this.spec01,
        spec2: this.spec02,
        spec3: this.spec03,
        idWorkout: this.idWorkout,
      };

      try {
        await this.$store.dispatch('workoutModule/update', updatedExercise);
        this.message = 'updated succesfully!';

        setTimeout(() => {
          this.$router.replace('/');
        }, 2000);
      } catch (err) {
        this.message = err;
      }
    },
  },
  computed: {
    authenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  font-size: 1.6rem;
  color: #44ba9f;
  padding: 2rem 3rem;
  text-transform: capitalize;
}

.close-message {
  color: #44ba9f;
  padding: 0.1rem 1rem;
  margin-top: -3rem;
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  cursor: pointer;
}

.specifics-container {
  margin-bottom: 1.5rem;
  @media (max-width: 460px) {
    text-align: start;
  }

  button {
    font-size: 1.4rem;
    padding: 0.25rem 0.5rem;
    border: 1px solid #44ba9f;
    border-radius: 5px;
    color: #44ba9f;
    cursor: pointer;
    transition: all 0.4s;
    margin-bottom: 2rem;
    margin-top: 1rem;
    text-align: start;
    @media (max-width: 460px) {
    }

    &:hover {
      color: #f4f4f4;
      border-color: #f4f4f4;
      background-color: #69c8b2;
    }
  }

  .specifics {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    gap: 2.5rem;
    flex: 1;
    @media (max-width: 700px) {
      gap: 0rem;
    }
    @media (max-width: 460px) {
      flex-direction: column;
    }
    @media (max-width: 460px) {
      flex-direction: column;
      margin-bottom: 2rem;
    }

    .icon {
      padding-right: 5px;
      // flex: 1;

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

    .exercise-name {
      flex: 2 !important;
      @media (max-width: 600px) {
        flex: 1 !important;
      }
    }

    .column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      flex: 1;

      input {
        border: 0.5px solid #44ba9f;
        border-radius: 5px;
        width: 80%;
      }

      h4 {
        color: #44ba9f;
        font-size: 1.8rem;
        font-weight: 300;
        @media (max-width: 850px) {
          font-size: 1.4rem;
        }
      }

      p {
        font-weight: 400;
        font-size: 1.6rem;
        text-align: start;
        text-transform: capitalize;

        @media (max-width: 850px) {
          font-size: 1.4rem;
        }
      }
    }
  }
}
</style>
