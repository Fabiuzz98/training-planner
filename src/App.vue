<template>
  <div class="app-container">
    <theHeader></theHeader>

    <router-view></router-view>
  </div>
</template>

<script>
import theHeader from './layout/TheHeader.vue';

export default {
  components: {
    theHeader,
  },

  created() {
    this.$store.dispatch('tryLogin');
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

html {
  font-size: 62.5%;
}

.app-container {
  min-height: 100vh;
}

.container {
  max-width: 120rem;
  margin: 0 auto;
}
</style>
