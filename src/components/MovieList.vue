<template>
  <h2 class="category-title">{{ category }}</h2>
  <div class="movie-list">
    <div class="movie-container">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="movie-item"
        :class="{ clicked: movie.clicked }"
        @click="redirectToDetailPage(movie.id)"
      >
        <img :src="movie.image" alt="Movie Poster"  />
        <div class="overlay">
          <h3 class="movie-title">{{ movie.title }}</h3>
          <p class="movie-summary">{{ movie.summary ? movie.summary.slice(0, 200) : ''}}</p>
        </div>
        <span
          class="heart-icon"
          :class="{ liked: isLiked(movie.id) }"
          @click.stop="handleHeartClick(movie.id)"
        >
          <i class="fas fa-heart" v-show="isLiked(movie.id)"></i>
          <i class="far fa-heart" v-show="!isLiked(movie.id)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
export default {
  name: "MovieList",
  store,

  props: {
    category: {
      type: String,
      required: true,
    },
    movies: {
      type: Array,
      required: true,
    },
  },

  methods: {
    redirectToDetailPage(movieId) {
      const movieItem = this.movies.find((movie) => movie.id === movieId);

      if (movieItem) {
        movieItem.clicked = true;
        setTimeout(() => {
          this.$router.push({
            name: "detail",
            params: { id: movieId },
            query: { movie: JSON.stringify(movieItem) },
          });
        }, 1000);
      }
    },
    handleHeartClick(movieId) {
      this.$store.dispatch("toggleMovieLike", movieId);
    },

    isLiked(movieId) {
      return this.$store.state.likedMovies.includes(movieId);
    },
  },
};
</script>
  
<style lang="scss" scoped>
@import '@/assets/variables';

.category-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
    color: #fff;
  }
.movie-list {
  display: flex;
  justify-content: center; /* Yatay hizalama */
  align-items: center; /* Dikey hizalama */
  margin-bottom: 20px;

  

  .movie-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Yatayda ortala */
    transition: all ease 0.8s;

    .movie-item {
      position: relative;
      width: calc(100% / 7);
      height: auto;      
      padding: 5px;
      margin: 5px;
      cursor: pointer;

      img {
        width: 100%;
        height: auto;
        max-height:20rem;
      }

      .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover .overlay {
        opacity: 1;
      }

      .movie-title {
        font-size: 20px;
        color: #fff;
        margin-bottom: 10px;
        text-align: center;
      }

      .movie-summary {
        font-size: 16px;
        color: #fff;
        text-align: center;
      }

      .heart-icon {
        position: absolute;
        bottom: 20px;
        right: 20px;
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
    }
    .movie-item.clicked img {
      transform: rotateX(360deg);
      transition: transform 1s;
    }
  }

  @media (max-width: 768px) {
    /* 768 piksel ve altındaki ekranlarda alt alta sıralama */
    flex-direction: column;

    .movie-container {
      align-items: center; /* Dikeyde ortala */

      .movie-item {
        width: calc(100% / 2);
        margin: 10px;
      }
    }
  }
}
</style>
  