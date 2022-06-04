<template>
  <div class="cardio-icon" v-if="!isStrenghtTraining">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#44ba9f"
      viewBox="0 0 256 256"
      class="run"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="152"
        cy="56"
        r="24"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></circle>
      <path
        d="M56,101.6s32-29.6,80,8c50.5,39.4,80,24,80,24"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M135.1,108.8C130.7,129.2,101.6,207,32,200"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M110.6,161.2C128.5,165,176,180,176,232"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
    </svg>
  </div>
  <div class="strength-icon" v-else>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="strenght"
      fill="#44ba9f"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <rect
        x="56"
        y="56"
        width="40"
        height="144"
        rx="8"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></rect>
      <rect
        x="160"
        y="56"
        width="40"
        height="144"
        rx="8"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></rect>
      <path
        d="M200,80h24a8,8,0,0,1,8,8v80a8,8,0,0,1-8,8H200"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M56,176H32a8,8,0,0,1-8-8V88a8,8,0,0,1,8-8H56"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <line
        x1="96"
        y1="128"
        x2="160"
        y2="128"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <line
        x1="232"
        y1="128"
        x2="248"
        y2="128"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <line
        x1="8"
        y1="128"
        x2="24"
        y2="128"
        fill="none"
        stroke="#44ba9f"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['mode'],
  data() {
    return {
      isStrenghtTraining: null,
    };
  },
  methods: {
    type() {
      if (this.mode === 'strength') {
        this.isStrenghtTraining = true;
      } else {
        this.isStrenghtTraining = false;
      }
    },
  },
  created() {
    this.type();
  },
};
</script>

<style scoped lang="scss">
div {
  margin-bottom: 1rem;
  .run {
    max-width: 14rem;
  }
  .strenght {
    max-width: 14rem;
  }
}
</style>
