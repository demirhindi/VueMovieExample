<template>
  <div class="home">
    <Banner />

    <MovieList category="Aksiyon" :movies="actionMovies" />
    <MovieList category="Dram" :movies="dramaMovies" />
    <MovieList category="Komedi" :movies="comedyMovies" />
  </div>
</template>

<script>
// @ is an alias to /src

import MovieList from "@/components/MovieList.vue";
import Banner from "@/components/Banner.vue";
import { public_key, secret_key } from "../marvel";
import axios from "axios";

export default {
  name: "HomeView",
  components: {
    MovieList,
    Banner,
  },
  data() {
    return {
      comics: [],
      selectedMovie: null,
      actionMovies: [
        

        // Diğer aksiyon filmleri...
      ],
      dramaMovies: [
        { id: 7, image: require("@/assets/Avengersendgame.jpg") },
        { id: 8, image: require("@/assets/Avengersendgame.jpg") },
        { id: 9, image: require("@/assets/Avengersendgame.jpg") },
        { id: 10, image: require("@/assets/dark.jpg") },
        { id: 11, image: require("@/assets/dark.jpg") },
        { id: 12, image: require("@/assets/dark.jpg") },
        // Diğer drama filmleri...
      ],
      comedyMovies: [
        { id: 13, image: require("@/assets/Avengersendgame.jpg") },
        { id: 14, image: require("@/assets/Avengersendgame.jpg") },
        { id: 15, image: require("@/assets/Avengersendgame.jpg") },
        { id: 16, image: require("@/assets/dark.jpg") },
        { id: 17, image: require("@/assets/dark.jpg") },
        { id: 17, image: require("@/assets/dark.jpg") },
      ],
    };
  },
  mounted() {
    this.getComics();
  },
  methods: {
    getComics: async function() {
  try {
    const response = await axios.get(`http://gateway.marvel.com/v1/public/comics?apikey=${public_key}`);
    console.log(response);
    
    response.data.data.results.forEach((item) => {
      console.log(item);
      const movie = {
        id: item.id,
        image: item.thumbnail.path + "." + item.thumbnail.extension,
        title: item.title,
        summary: item.description,
        creators: item.creators.items
      };
      this.actionMovies.push(movie);
    });
  } catch (error) {
    console.log(error);
  }
}
  },
};
</script>
