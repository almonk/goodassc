<template>
  <div>
    <div class="bg-blue flex flex-column">
      <header-nav>
      </header-nav>

      <div class="mw6 center mt2 mt3-ns mb3 mb5-ns flex flex-column w-100 ph3">
        <h1 class="fw4 f5 f4-ns white tc headline">Good places to work from in London</h1>

        <gmap-autocomplete autofocus="true" class="pa2 f5 f4-ns black br2 ba b--white" @place_changed="getPlacesForLatLong" :options="{
            bounds: {south:51.39659490168168,west:-0.36116195175782195,north:51.640992906652016,east:0.19708084609374055},
            types: ['geocode'],
            strictBounds: true
        }"></gmap-autocomplete>

      </div>
      
    </div>

    <div class="mw7 center flex mt3 flex-column flex-row-ns flex-wrap">
      <div v-for="place in places" class="flex w-50-ns flex-column mv2">
        <div class="thumb bw1 bg-white br2 pa3 flex-auto mh2 flex flex-column justify-between f6 f5-ns">
          <div>
            <span class="blue db pb1 fw7">
              {{place.placeName}}
            </span>
            <div class="flex db mb2">
              {{place.address}}
              {{place.milesFrom}}mi
            </div>
          </div>
          

          <div class="flex mt3 pt2">
            <div class="flex-auto tc f7 ttu">
              <span>Free<br>wifi</span>
            </div>
            <div class="flex-auto tc f7 ttu">
              <span>PLAYS<br>TUNES</span>
            </div>
            <div class="flex-auto tc f7 ttu">
              <span>GREAT<br>COFFEE</span>
            </div>
            <div class="flex-auto tc f7 ttu">
              <span>Quiet<br>Space</span>
            </div>
            <div class="flex-auto tc f7 ttu">
              <span>Power<br>plugs</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-if="places == 0">
      No places found
    </div>
  </div>
</template>

<script>
import Near from '@/components/Near'
import HeaderNav from '@/components/Nav'

export default {
  data: function() {
    return {
      places: []
    }
  },
  components: {
    Near,
    HeaderNav
  },
  mounted: function() {
    Parse.initialize("goodasc");
    Parse.serverURL = 'http://goodasc-backend.herokuapp.com/parse';
  },
  methods: {
    getPlacesForLatLong: function(place) {
      this.places = []
      var userGeoPoint = new Parse.GeoPoint(place.geometry.location.lat(), place.geometry.location.lng());
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
              'address': object[i].get('address'),
              'milesFrom': Math.round(placePoint.milesTo(userGeoPoint)),
              'review': object[i].get('shortReview'),
            })
          }
        }.bind(this)
      });
    },

    getPlacesNearUser: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          this.places = []
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
                  'address': object[i].get('address'),
                  'milesFrom': Math.round(placePoint.milesTo(userGeoPoint)),
                  'review': object[i].get('shortReview'),
                })
              }
            }.bind(this)
          });
        }.bind(this));
      }
    }
  }
}
</script>

<style>
  .bg-blue {
    background: #318DFF;
  }

  .blue {
    color: #318DFF;
  }

  .thumb {
    box-shadow: 0 3px 6px rgba(0,0,0,0.05);
  }
</style>
