<template>
    <section class="toy-list">
      <ul class="clean-list">
        <li class="toy" v-for="toy in toys" :key="toy._id">
          <ToyPreview :toy="toy" @remove-toy="removeToy(toy._id)" />
        </li>
      </ul>
    </section>
  </template>


<script>
import ToyPreview from '../components/ToyPreview.vue'

export default {
    name: 'ToyList',
    props: {
        toys: {
            type: Array,
        },
    },
    data() {
        return{}
    },
    methods: {
    removeToy(toyId) {
      this.$emit('remove-toy', toyId)
    },
  },
    components: {
        ToyPreview
    }
}
</script>