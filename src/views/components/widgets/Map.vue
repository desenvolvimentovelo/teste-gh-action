<template>
  <div id="mapContainer" style="height: 100%" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapGetters } from "vuex";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken:
        "pk.eyJ1IjoidmR1Z2dlbi12ZWxvIiwiYSI6ImNra3lnMXR1azAxb2Iybmx1OWU1MHQ0MnkifQ.OmLUGmy5v5b5eKHgTt0b9A",
    };
  },

  computed: {
    ...mapGetters(["getLocalization"]),
  },

  methods: {
    map: (geolocation) =>
      new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/streets-v11",
        center: geolocation,
        zoom: 16,
      }),
  },

  mounted() {
    mapboxgl.accessToken = this.accessToken;

    let geolocation = this.getLocalization;

    let map = this.map(geolocation);

    new mapboxgl.Marker().setLngLat(geolocation).addTo(map);
  },
};
</script>
