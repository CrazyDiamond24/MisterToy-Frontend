<template>
  <div class="about">
    <div class="about-content">
      <h1>About Us</h1>
      <p>At ToysRus, we're dedicated to bringing you the best selection of toys and games for kids of all ages. With branches located all across the country, you can be sure to find the perfect gift for any occasion.</p>
      <p>Whether you're shopping for a birthday present, holiday gift, or just want to treat your little one to something special, our friendly and knowledgeable staff are always on hand to help you find exactly what you're looking for.</p>
      <p>Visit one of our many branches today and discover the magic of ToysRus!</p>
    </div>
    <div class="map-container">
      <GoogleMap />
    </div>
  </div>
</template>




<script>
import GoogleMap from '../components/GoogleMap.vue'

export default {
  name: 'About',

  computed: {

  },
  created() {

  },
  components: {
GoogleMap,
  },
}

</script>
<style></style>
