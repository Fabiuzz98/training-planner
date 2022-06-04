<template>
  <router-link :to="workoutDetails">
    <div class="workout-card">
      <training-type :mode="type"></training-type>
      <p>{{ type }}</p>
      <h3>{{ title }}</h3>
    </div>
  </router-link>
</template>

<script>
import trainingType from '../ui/BaseIconTraining.vue';

export default {
  components: { trainingType },
  props: ['title', 'type', 'id'],
  computed: {
    workoutDetails() {
      return this.$route.path + '/' + this.id + '/details';
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.workout-card {
  background-color: #f1f1f1;
  border-radius: 8px;
  text-align: center;
  max-width: 40rem;
  padding: 3.5rem 7rem;
  width: 28rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    margin: 1.5rem;
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
</style>
