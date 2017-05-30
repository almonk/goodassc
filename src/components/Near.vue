<template>
  <div>
    <div v-if="!locationEnabled">
      <h4 class="f4 f2-ns mt0 mb3 light-purple">Nearest you</h4>
      <div class="bg-light-gray tc pa3">
        Getting your location...
      </div>
    </div>

    <div v-if="locationEnabled">
      <h4 class="f4 f2-ns mt0 mb3 light-purple">Nearest you</h4>

      <div class="flex flex-column">
        <div v-for="place in places" class="flex items-start flex-column w-100 mb2 pb2 bb b--light-gray bw2">
          <a class="flex link flex-auto" href="#">
            <div class="flex-column">
              <h4 class="b mt2 f4 mb2 black">{{place.placeName}}</h4>
              <p class="ma0 mb2 dark-gray lh-copy black">&ldquo;{{place.review}}&rdquo;</p>
              <div class="mb2">
                <span v-for="tag in place.tags" class="br-pill dib bg-light-purple white b pv1 ph2 f7 mr2 ttu">{{tag}}</span>
              </div>
            </div>
          </a>
        </div>
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

        var userGeoPoint = new Parse.GeoPoint(position.coords.latitude, position.coords.longitude);
        var places = Parse.Object.extend("Place");
        var query = new Parse.Query(places);
        query.near("location", userGeoPoint);
        query.limit(10);
        query.find({
          success: function(object) {
            this.locationEnabled = true
            for (var i = 0; i < object.length; i++) {
              var placePoint = new Parse.GeoPoint(object[i].get('location'))

              this.places.push({
                'placeName': object[i].get('placeName'),
                'photo': object[i].get('photo').url(),
                'tags': object[i].get('tags'),
                'milesFrom': Math.round(placePoint.milesTo(userGeoPoint)),
                'review': object[i].get('shortReview'),
              })
            }
          }.bind(this)
        });
        console.log(position)
      }.bind(this));
    }
  },
}
</script>

<style scoped>
  h4 {
    font-family: 'Archivo Black', sans-serif;
    font-weight: 100;
  }
</style>
