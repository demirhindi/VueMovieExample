<template>
    <div class="table">
    <h1 class="page-title">Liked Comics</h1>
    <div class="liked-comics">
      
      <div v-if="likedComics.length === 0">
        <p>No liked comics found.</p>
      </div>
      <div v-else>
        <div
          v-for="comic in likedComics"
          :key="comic.id"
          class="comic"
          @click="redirectToDetailPage(comic.id)"
        >
          <img :src="comic.image" :alt="comic.title" class="comic-image" />
          <h3 class="comic-title">{{ comic.title }}</h3>
          <span class="remove-icon" @click="removeLikedComic(comic.id)">x</span>
        </div>
      </div>
    </div>
</div>
  </template>
  <script>
import axios from "axios";
import { public_key } from "../marvel";

export default {
  name: "LikedComics",
  data() {
    return {
      likedComics: [], // Beğenilen çizgi romanların tutulduğu dizi
    };
  },
  created() {
    this.getLikedComics();
  },
  methods: {
    async getLikedComics() {
      const likedMovies = this.$store.state.likedMovies;

      if (likedMovies.length === 0) {
        return;
      }

      try {
        const response = await axios.get(
          `http://gateway.marvel.com/v1/public/comics?apikey=${public_key}`
        );
        const allComics = response.data.data.results;

        this.likedComics = allComics
          .filter((comic) => likedMovies.includes(comic.id))
          .map((comic) => {
            const thumbnail = comic.thumbnail;
            const image = `${thumbnail.path}.${thumbnail.extension}`;

            return {
              id: comic.id,
              image: image,
              title: comic.title,
              summary: comic.description,
            };
          });
      } catch (error) {
        console.log(error);
      }
    },
    removeLikedComic(comicId) {
      this.$store.commit("toggleMovieLike", comicId);
      this.likedComics = this.likedComics.filter(
        (comic) => comic.id !== comicId
      );
    },
    redirectToDetailPage(comicId) {
      const comicItem = this.likedComics.find((comic) => comic.id === comicId);

      if (comicItem) {
        comicItem.clicked = true;
        const queryParams = {
          movie: JSON.stringify(comicItem),
        };
        setTimeout(() => {
          this.$router.push({
            name: "detail",
            params: { id: comicId },
            query: queryParams,
          });
        }, 1000);
      }
    },
  },
};
</script>
  
<style scoped lang="scss">

.table{
    background-color: #221F1F;
}
.page-title {
    margin: 0;
    color: white;
    text-align: center;
  }
.liked-comics {
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;


  

  p {
    margin: 5px;
    color: white;
    text-align: center;
    }

  .comic {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    .comic-image {
      width: 150px;
      
      height: auto;
      max-height: 20rem;
      margin-right: 10px;
    }

    .comic-title {
      margin: 0;
      font-size: 18px;
      color: #fff;
    }
  }
}
</style>
