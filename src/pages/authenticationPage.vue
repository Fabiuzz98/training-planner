<template>
  <base-message v-if="message" :messageType="errorType" @close="closeModal">{{
    message
  }}</base-message>
  <div class="container">
    <h2 v-if="switchToRegister">Register</h2>
    <h2 v-else>Login</h2>
    <form action="" @submit.prevent="login" :class="{ errorMessage: message }">
      <div class="column">
        <label for="">Email</label>
        <input type="text" v-model="email" />
      </div>
      <div class="column">
        <label for="">Password</label>
        <input type="password" v-model="password" />
      </div>

      <button v-if="switchToRegister" @click="signUp">Register</button>
      <button v-else @click="login">Login</button>
    </form>
    <p class="message">{{ error }}</p>
    <p v-if="!switchToRegister">
      Don't have an account? <span @click="changeAuthType">Register</span>
    </p>
    <p v-else>
      Already have an account? <span @click="changeAuthType">Login</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      switchToRegister: false,
      error: '',
      message: '',
      errorType: '',
    };
  },

  methods: {
    async signUp() {
      try {
        if (
          this.email === '' ||
          this.password === '' ||
          !this.email.includes('@') ||
          this.password.length < 6
        ) {
          this.error =
            'Please fill in all the empty fields and password must be at least 6 characters';
          return;
        }

        const credentials = { email: this.email, password: this.password };

        await this.$store.dispatch('signUp', credentials);

        this.message = 'User created successfully 😊';
        this.errorType = 'success';

        setTimeout(() => {
          this.$router.replace('/');
        }, 2000);
      } catch (err) {
        this.message = err;
        this.errorType = 'error';
      }
    },

    async login() {
      try {
        if (this.email === '' || this.password === '') {
          this.error =
            'Please fill in all the empty fields and password must be at least 6 characters';
          return;
        }

        const credentials = { email: this.email, password: this.password };

        await this.$store.dispatch('login', credentials);

        this.$router.replace('/');
      } catch (err) {
        this.message = err;
        this.errorType = 'error';
      }
    },

    changeAuthType() {
      this.switchToRegister = !this.switchToRegister;
    },

    closeModal() {
      this.message = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.errorMessage {
  border: 2px solid red;
  padding: 1rem;
  border-radius: 5px;
}
.container {
  max-width: 60rem;
  background-color: #f1f1f1;
  padding: 3.5rem 7rem;
  color: #44ba9f;
  margin-top: 4rem;
  text-align: start;
  @media (max-width: 800px) {
    margin: 4rem 4rem 0 4rem;
  }
  @media (max-width: 450px) {
    padding: 3.5rem 4rem;
  }

  .message {
    color: red;
    font-size: 1.6rem;
  }

  p {
    color: #000;
    font-size: 1.3rem;
    text-align: center;
    margin-top: 2.5rem;
    letter-spacing: 0.6px;

    span {
      color: #44ba9f;
      cursor: pointer;
    }
  }

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  form {
    margin-top: 2rem;
    .column {
      display: flex;
      flex-direction: column;
      margin-top: 1rem;

      label {
        font-size: 1.4rem;
      }

      input {
        border: none;
        font-size: 1.6rem;

        &:focus {
          outline: 1px solid #44ba9f;
        }
      }
    }

    button {
      font-size: 1.6rem;
      color: #f4f4f4;
      background-color: #69c8b2;
      border: 1px solid #69c8b2;
      margin-top: 2rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.4s;

      &:hover {
        color: #69c8b2;
        background-color: #f4f4f4;
      }
    }
  }
}
</style>
