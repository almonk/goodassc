<template>
  <div>
    <h4 class="f4 f2-ns mt0 mb3 light-purple">{{name}}</h4>
    <p class="ma0 mb2 dark-gray lh-copy black">&ldquo;{{review}}&rdquo;</p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: '',
      review: ''
    }
  },
  mounted: function() {
    Parse.initialize("goodasc");
    Parse.serverURL = 'http://goodasc-backend.herokuapp.com/parse';

    var places = Parse.Object.extend("Place");
    var query = new Parse.Query(places);
    query.equalTo("objectId", this.$route.params.id);
    query.first({
      success: function(object) {
        this.name = object.get('placeName')
        this.review = object.get('shortReview')
      }.bind(this)
    });
  }
}
</script>

<style scoped>
  h4 {
    font-family: 'Archivo Black', sans-serif;
    font-weight: 100;
  }

  .thumb {
    height: 48px;
    width: 48px;
    overflow: hidden;
    flex-basis: 48px;
  }
</style>
