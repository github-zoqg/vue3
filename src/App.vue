<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  <!-- <childCounte />
  <scriptSetup /> -->
  <!-- <router-link to="/">Go to Home</router-link> -->
  <!-- <router-link to="/about">Go to About</router-link> -->
  <div>
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import childCounte from "./components/setup.vue";
// import scriptSetup from "./components/scriptSetup.vue";
import Header from "./components/header.vue";

export default {
  name: "App",
  components: {
    Header,
    // HelloWorld,
    // childCounte,
    // scriptSetup,
  },
  data() {
    return {
      name: "app",
    };
  },
  mounted() {
    console.log(this, this.name, this.$router);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
