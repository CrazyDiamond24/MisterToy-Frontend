<template>
  <GoogleMap
    class="google-map"
    api-key="AIzaSyDMJMKg8lGEE1CzmcOwNgvX6qfWQbiofe0"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="zoom"
  >
    <Marker :options="{ position: pos1 }" />
    <Marker :options="{ position: pos2 }" />
    <Marker :options="{ position: pos3 }" />
    <Marker :options="{ position: pos4 }" />
  </GoogleMap>
  <div class="branch-buttons">
    <button @click="center = pos1">Jerusalem</button>
    <button @click="center = pos2">Tel Aviv</button>
    <button @click="center = pos3">Haifa</button>
    <button @click="center = pos4">Netanya</button>
  </div>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      pos1: { lat: 31.768319, lng: 35.21371 },
      pos2: { lat: 32.0853, lng: 34.781769 },
      pos3: { lat: 32.794044, lng: 34.989571 },
      pos4: { lat: 32.331179, lng: 34.855499 },
      center: { lat: 32.0853, lng: 34.781769 },
      zoom: 8,
    }
  },
  methods: {

  },
}
</script>
