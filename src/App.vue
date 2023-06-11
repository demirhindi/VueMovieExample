<template>
  
    <Navbar/>    
  
  <router-view/>
</template>

<script>


import Navbar from '@/components/Navbar.vue'


export default {
  name: 'App',
  components: {
    Navbar    
  },
  
}
</script>

<style lang="scss">
@import '@/assets/variables';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  padding: 0;
  background-color: $bg-tone;
  
}


</style>
