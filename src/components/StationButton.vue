<template>
  <button class="stat-btn btn btn-secondary" @click="getStation()">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "StationButton",
  props: {
    place: {
      type: String,
      require: true
    }
  },
  methods: {
    getStation() {
      this.$emit("getStation", this.place);
    }
  }
};
</script>

<style>
button {
  margin-left: 15px;
}
</style>
