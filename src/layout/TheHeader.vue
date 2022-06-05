<template>
  <header>
    <div class="container" v-if="!isMobile">
      <div class="navigation-desktop">
        <div class="branding">
          <router-link to="/">TRAINING PLANNER </router-link>
        </div>

        <ul class="desktop-menu">
          <li>
            <router-link class="link" :to="{ name: 'home' }">Home</router-link>
          </li>
          <li>
            <router-link
              class="link"
              v-if="isAuthenticated"
              :to="{ name: 'createWorkout' }"
              >Create</router-link
            >
          </li>
          <li>
            <router-link
              class="link"
              v-if="!isAuthenticated"
              :to="{ name: 'authenticationPage' }"
              >Login</router-link
            >
          </li>
          <li>
            <router-link
              class="link"
              v-if="isAuthenticated"
              to="/"
              @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="hamburger" v-if="isMobile && !isOpen" @click="toggleMobileNav">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </div>

    <div
      class="close-hamburger"
      v-if="isOpen && isMobile"
      @click="toggleMobileNav"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 close-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>

    <transition name="navigation-mobile">
      <ul class="navigation-mobile" v-if="isOpen" @click="toggleMobileNav">
        <li>
          <router-link class="link" :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
          <router-link
            class="link"
            :to="{ name: 'createWorkout' }"
            v-if="isAuthenticated"
            >Create</router-link
          >
        </li>
        <li>
          <router-link
            class="link"
            v-if="!isAuthenticated"
            :to="{ name: 'authenticationPage' }"
            >Login</router-link
          >
        </li>
        <li>
          <router-link
            class="link"
            to="/"
            v-if="isAuthenticated"
            @click="logout"
            >Logout</router-link
          >
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMobile: null,
      isOpen: null,
    };
  },

  methods: {
    checkIfMobile() {
      if (+window.innerWidth <= +750) {
        this.isMobile = true;
      } else {
        this.isMobile = null;
        this.isOpen = null;
      }
    },

    toggleMobileNav() {
      this.isOpen = !this.isOpen;
    },

    closeMobileNav() {
      this.isOpen = null;
    },

    logout() {
      this.$store.dispatch('logout');
    },
  },

  created() {
    window.addEventListener('resize', this.checkIfMobile);
    this.checkIfMobile();
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
};
</script>

<style scoped lang="scss">
header {
  position: relative;
  background-color: #44ba9f;
  min-width: 100%;
  color: #ffffff;
  font-size: 1.6rem;
  padding: 2rem 4rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    list-style: none;
    color: #ffffff;
    text-decoration: none;
    padding-left: 5rem;
  }

  .navigation-desktop {
    display: flex;
    justify-content: space-between;

    .branding {
      a {
        text-decoration: none;
        color: #fff;
      }
    }

    .desktop-menu {
      display: flex;
      list-style: none;
    }
  }

  .hamburger {
    width: 2.4rem;
    height: 2.4rem;
    position: absolute;
    top: 8px;
    left: 20px;
    cursor: pointer;
    z-index: 99999;
  }

  .close-hamburger {
    .close-icon {
      width: 2.4rem;
      height: 2.4rem;
      position: absolute;
      top: 8px;
      left: 20px;
      cursor: pointer;
    }
  }

  .navigation-mobile {
    position: fixed;
    top: 35px;
    left: 0;
    right: 0;
    background-color: #44ba9f;
    height: 50%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 2.5rem;
    list-style: none;

    li {
      transform: translateX(-25%);
    }
  }
}

.navigation-mobile-enter-active,
.navigation-mobile-leave-active {
  transition: all 0.5s ease;
}

.navigation-mobile-enter-from {
  opacity: 0;
  transform: scale(1.5);
}

.navigation-mobile-enter-to {
  opacity: 1;
  transform: scale(1);
}

.navigation-mobile-leave-to {
  opacity: 0;
  transform: scale(1.4);
}
</style>
