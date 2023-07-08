<template>
  <div class="toy-preview">
    <button title="delete" @click="$emit('remove-toy', toy._id)">X</button>
    <img class="toy-preview-img" :src="toy.image" alt="Toy Image" />
    <h3 class="toy-name">{{ toy.name }}</h3>
    <p class="toy-price">{{ toy.price }}$</p>
    <div class="toy-labels">
      <span v-for="label in toy.labels" :key="label" class="toy-label">{{ label }}</span>
    </div>
      <div class="preview-btns">
      <router-link class="btn" :to="{path: 'toy/edit/' + toy._id}">Edit</router-link>
      <router-link class="btn" :to="{path: 'toy/' + toy._id}">Details</router-link>
    </div>
  </div>
</template>

<script>
export default {
    props: ['toy'],
    name: 'ToyPreview'
}

</script>