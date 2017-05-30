<template>
  <div>
    <h4 class="f4 f2-ns mt0 mb3 light-purple">Recently added</h4>

    <div class="flex flex-column">
      <div v-for="place in places" class="flex items-start flex-column w-100 mb2 pb2 bb b--light-gray bw2">
        <router-link class="link" :to="{ name: 'Place', params: { id: place.objectId }}">
          <div class="flex-column">
            <h4 class="b mt2 f4 mb2 black">{{place.placeName}}</h4>
            <p class="ma0 mb2 dark-gray lh-copy black">&ldquo;{{place.review}}&rdquo;</p>
            <div class="mb2">
              <span v-for="tag in place.tags" class="br-pill dib bg-light-purple white b pv1 ph2 f7 mr2 ttu">{{tag}}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <near></near>
  </div>
</template>

<script>
import Near from '@/components/Near'

export default {
  data: function() {
    return {
      places: [],
    }
  },
  components: {
    Near
  },
  mounted: function() {
    Parse.initialize("goodasc");
    Parse.serverURL = 'http://goodasc-backend.herokuapp.com/parse';

      var places = Parse.Object.extend("Place");
      var query = new Parse.Query(places);
      query.descending("createdAt");
      query.limit(4);
      // query.equalTo("tags", 'free wifi');
      query.find({
        success: function(object) {
          for (var i = 0; i < object.length; i++) {
            this.places.push({
              'placeName': object[i].get('placeName'),
              'objectId': object[i].id,
              'photo': object[i].get('photo').url(),
              'tags': object[i].get('tags'),
              'review': object[i].get('shortReview'),
            })
          }
        }.bind(this)
      });
  },
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
