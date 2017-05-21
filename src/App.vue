<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--wsq-query></wsq-query-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Query from './components/Query'
export default {
  name: 'app',
//   components: {
//       'wsq-query': Query
//   }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 2rem;
  width: 100%;
  font-size:24px;
}
#app img {
    width: 120px;
}
</style>
