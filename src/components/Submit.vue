<template>
  <div>
    <div class="bg-blue flex flex-column">
      <header-nav>
      </header-nav>
     </div>	

     <div class="mw6 center ph3 flex flex-column mt3">
				<div class="black mb2 fw6">Place name</div>
				<input v-model="placeName" autofocus="true" type="" name="" class="pa2 ba b--light-blue f6 black br2 ba b--white">

				<div class="black mb2 fw6 mt3">Address</div>
				<gmap-autocomplete class="pa2 ba b--light-blue f6 black br2 ba b--white" @place_changed="setLatLng" :options="{
	        bounds: {south:51.39659490168168,west:-0.36116195175782195,north:51.640992906652016,east:0.19708084609374055},
		        types: ['geocode'],
		        strictBounds: true
		    }"></gmap-autocomplete>

		    <button v-on:click="savePlace" class="bg-blue white pa2 br2 ba b--blue mt3">Submit</button>
     </div>

  </div>
</template>

<script>
import HeaderNav from '@/components/Nav'
export default {
  components: {
    HeaderNav
  },
  data: function() {
    return {
      latLng: [],
      placeName: "",
      address: "",
    }
  },
  methods: {
  	setLatLng: function(place) {
  		this.latLng = [place.geometry.location.lat(), place.geometry.location.lng()];
  		this.address = place.formatted_address;
  	},
  	savePlace: function() {
  		Parse.initialize("goodasc");
	    Parse.serverURL = 'http://goodasc-backend.herokuapp.com/parse';
  		var Place = Parse.Object.extend("Place");
			var place = new Place();
			var geoPoint = new Parse.GeoPoint(this.latLng[0], this.latLng[1]);

			place.set("placeName", this.placeName);
			place.set("location", geoPoint);
			place.set("address", this.address);

			place.save(null, {
			  success: function(place) {
			    alert('New object created with objectId: ' + place.id);
			  },
			  error: function(place, error) {
			    alert('Failed to create new object, with error code: ' + error.message);
			  }
			});
  	}
  }
}
</script>
