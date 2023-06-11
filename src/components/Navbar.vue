<template>
  <nav :class="{ 'navbar-fixed': showNavbar }">
    <div class="container">
      <div class="logo"><a href="/" class="logo">Logo</a></div>
      <div class="menu-right">
        <div class="heart-icon">
          <i class="fas fa-heart icons"></i>
          <span class="badge">{{ $store.getters.likeCount }}</span>
          
        </div>
        <div class="menu-button" @click="toggleMenu">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </div>
    <div class="menu" :class="{ show: showMenu }">
      <ul>
        <li><a href="/">Home</a></li>
        
        <li><a href="/liked">Liked Comics</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import store from "../store";

export default {
  name: "Navbar",
  store,
  data() {
    return {
      showNavbar: false,
      showMenu: false,
      likeCount: 5,
    };
  },
  
  handleHeartClick(movieId) {
    this.$store.dispatch("toggleMovieLike", movieId);
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showNavbar = window.pageYOffset > 0;
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/variables";
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
  z-index: 999;

  &.navbar-fixed {
    background-color: $soft-gray-tone;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;

    .logo {
      font-size: 20px;
      text-decoration: none;
      color: $red-tone;
    }
    .icons {
      color: $heart-color;
    }

    .menu-right {
      display: flex;
      align-items: center;
    }

    .menu-button {
      font-size: 24px;
      cursor: pointer;
      color: #fff;
    }

    .heart-icon {
      position: relative;
      font-size: 24px;
      margin-right: 10px;
    }

    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      background-color: $red-tone;
      border-radius: 50%;
      font-size: 12px;
      color: white;
    }
  }

  .menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #666;
    padding: 10px;
    display: none;
    width: 100%;

    &.show {
      display: block;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 10px;
        padding: 10px;
        transition: background-color 0.8s;

        &:hover {
          background-color: $red-tone; /* Arka plan rengi kırmızı */
        }

        a {
          color: #333333;
          text-decoration: none;
          font-size: 25px;
          transition: color 0.8s;

          &:hover {
            color: #fff; /* Yazı rengi mavi */
          }
        }
      }
    }
  }
}
</style>