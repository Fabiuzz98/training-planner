<template>
  <div class="message-container">
    <div class="backdrop" @click="closeModal"></div>
    <div class="text-container">
      <h2 class="error" v-if="messageType === 'error'">Error!</h2>
      <h2 class="success" v-if="messageType === 'success'">Success!</h2>
      <p><slot></slot></p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messageType'],

  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.message-container {
  z-index: 999;
  position: absolute;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .backdrop {
    width: 100%;
    height: 100vh;
    background-color: rgba(30, 31, 46, 0.7);
  }

  .text-container {
    text-align: center;
    background-color: #edf9f6;

    border-radius: 5px;
    position: absolute;
    border-radius: 5px;
    padding: 2.5rem 5rem;

    .error {
      color: red;
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }

    .success {
      color: green;
      font-size: 2.2rem;
      margin-bottom: 2rem;
    }

    p {
      font-size: 1.8rem;
      margin-bottom: 3rem;
    }

    button {
      font-size: 1.4rem;
      color: #468677;
      background-color: #f4f4f4;

      border: 1px solid #468677;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        color: red;
        border: 1px solid red;
      }
    }
  }
}
</style>
