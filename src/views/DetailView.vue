<template>
  <div class="detail-view">
    <div v-if="movie" class="detail-content">
      <div class="image-container">
        <img :src="movie.image" alt="Movie Poster" />
      </div>
      <div class="text-container">
        <h2 class="movie-title">{{ movie.title }}</h2>
        <p class="movie-summary">{{ movie.summary }}</p>

        <ul>
          <li
            class="movie-summary"
            v-for="creator in movie.creators"
            :key="creator.resourceURI"
          >
          {{ creator.role }}: {{ creator.name }}
          </li>
        </ul>
        <span
          class="heart-icon"
          :class="{ liked: isLiked(movie.id) }"
          @click="handleHeartClick(movie.id)"
        >
          <i class="fas fa-heart" v-show="isLiked(movie.id)"></i>
          <i class="far fa-heart" v-show="!isLiked(movie.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "DetailView",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      movie: null,
    };
  },
  created() {
    this.fetchMovie();
  },
  computed: {
    isLiked() {
      return (movieId) => this.$store.state.likedMovies.includes(movieId);
    },
  },
  methods: {
    fetchMovie() {
      const movieData = this.$route.query.movie;
      if (movieData) {
        this.movie = JSON.parse(movieData);
      }
    },
    handleHeartClick(movieId) {
      this.$store.dispatch("toggleMovieLike", movieId);
    },
  },
};
</script>
  
  <style lang="scss" scoped>
@import "@/assets/variables";
.detail-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: $bg-tone;
}

.detail-content {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 40px;
}

.image-container {
  flex: 1;
  text-align: center;
}

.image-container img {
  max-width: 80%;
  height: auto;
}

.text-container {
  flex: 1;
  padding-left: 40px;
  color: #fff;
}

.movie-title {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 2px;
}

.movie-summary {
  font-size: 16px;
  margin-top: 20px;
  font-style: italic;
  text-decoration: none;
  list-style-type: none;
  text-transform: capitalize;
}

.heart-icon {
  color: #fff;
  font-size: 30px;
  cursor: pointer;
  transition: all ease 0.8s;

  &.liked {
    color: $red-tone;
  }

  &:hover {
    font-size: 40px;
    color: $red-tone;
  }
}

@media (max-width: 768px) {
  .detail-content {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .image-container {
    margin-bottom: 20px;
  }
}
</style>
  