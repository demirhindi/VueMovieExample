import { createStore } from 'vuex';

const store = createStore({
  state: {
    likedMovies: [] // Beğenilen filmlerin tutulduğu dizi
  },
  getters: {
    likeCount: state => state.likedMovies.length // Beğeni sayısını hesaplayan bir getter
  },
  mutations: {
    toggleMovieLike(state, movieId) {
      const index = state.likedMovies.indexOf(movieId);
      if (index !== -1) {
        // Film zaten beğenilmiş, beğeniden çıkar
        state.likedMovies.splice(index, 1);
      } else {
        // Film henüz beğenilmemiş, beğen
        state.likedMovies.push(movieId);
      }
    }
  },
  actions: {
    toggleMovieLike({ commit }, movieId) {
      commit('toggleMovieLike', movieId);
    }
  },
  plugins: [
    (store) => {
      const initializeStore = () => {
        const storedState = localStorage.getItem('vuex-state');
        if (storedState) {
          store.replaceState(JSON.parse(storedState));
        }
      };

      initializeStore(); // Durumu başlangıçta yerel depolamadan al

      store.subscribe((mutation, state) => {
        localStorage.setItem('vuex-state', JSON.stringify(state));
      });
    }
  ],
});

export default store;
