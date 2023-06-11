<template>
  <div class="banner">
    <button class="arrow left-arrow" @click="prevImage">
      <i class="fas fa-chevron-left"></i>
    </button>
    <transition name="fade">
      <img :key="currentImage" :src="currentImage" alt="Film Poster" />
    </transition>
    <button class="arrow right-arrow" @click="nextImage">
      <i class="fas fa-chevron-right"></i>
    </button>
    <div class="film-info">
      <h2 class="film-title">{{ currentFilm.title }}</h2>
      <div class="buttons">
        <button class="play-button">Play</button>
        <button class="mylist-button">My List</button>
      </div>
      <p class="film-description">{{ currentFilm.description }}</p>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Banner",
  data() {
    return {
      currentImageIndex: 0,
      currentFilm: {
        title: "",
        description: "",
      },
    };
  },
  mounted() {
    this.currentFilm = this.films[0];
    setInterval(this.nextImage, 5000); // Otomatik geçiş için
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
    images() {
      return [
        require("@/assets/dark.jpg"),
        require("@/assets/Avengersendgame.jpg"),
        require("@/assets/spiderman.jpg"),
      ];
    },
    films() {
      return [
        {
          title: "Film 1",
          description: "Film 1 Açıklaması",
        },
        {
          title: "Film 2",
          description: "Film 2 Açıklaması",
        },
        {
          title: "Film 3",
          description: "Film 3 Açıklaması",
        },
      ];
    },
  },
  methods: {
    nextImage() {
      this.currentImageIndex =
        (this.currentImageIndex + 1) % this.images.length;
      this.currentFilm = this.films[this.currentImageIndex];
    },
    prevImage() {
      this.currentImageIndex =
        (this.currentImageIndex - 1 + this.images.length) % this.images.length;
      this.currentFilm = this.films[this.currentImageIndex];
    },
  },
};
</script>
  
<style scoped lang="scss">
@import '@/assets/variables';
.banner {
  position: relative;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  transition: opacity 0.3s;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}

.left-arrow:hover,
.right-arrow:hover {
  opacity: 0.7;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.film-info {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
}

.film-title {
  font-size: 24px;
  font-weight: bold;
}

.buttons {
  margin-top: 10px;
}

.play-button,
.mylist-button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: $red-tone;
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.8s, color 0.8s;
  &:hover {
    background-color: white; /* Arka plan rengi kırmızı */
    color: $red-tone; /* Yazı rengi mavi */
  }
}

.film-description {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.5;
}
</style>