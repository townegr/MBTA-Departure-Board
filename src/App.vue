<template>
  <div id="app">
    <DepartureBoard />
  </div>
</template>

<script>
import DepartureBoard from "./components/DepartureBoard";

export default {
  name: "App",
  components: {
    DepartureBoard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #cfcfcf;
  margin-top: 60px;
}
</style>
