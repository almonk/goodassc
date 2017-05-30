<template>
  <div id="app" class="mw6 center ph2 ph3-ns">
    <div class="pv2 pt5-ns pb4-ns">
      <router-link class="f4 f2-ns ma0 black no-underline" to="/">Good Associates</router-link>
      <h4 class="f4 f2-ns ma0">Good places to work from in London.</h4>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  a, h4 {
    font-family: 'Archivo Black', sans-serif;
    font-weight: 100;
  }
</style>