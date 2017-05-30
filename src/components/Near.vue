<template>
  <div>
    <div v-if="!locationEnabled">
      <h4>Nearest you</h4>
      <div>
        Getting your location...
      </div>
    </div>

    <div v-if="locationEnabled">
      <h4>Nearest you</h4>

      <div v-for="place in places">
        {{place.placeName}}
        &ldquo;{{place.review}}&rdquo;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      locationEnabled: false,
      places: []
    }
  },
  mounted: function() {

  },
}
</script>

<style scoped>
  h4 {
    font-family: 'Archivo Black', sans-serif;
    font-weight: 100;
  }
</style>
