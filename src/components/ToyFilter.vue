<template>
  <div
    class="toy-filter-indicator"
  >
    <div class="hint-and-container">
      <span class="hint" v-show="!showFilter">Options</span>
      <section
        class="toy-filter-container"
        v-show="showFilter"
        ref="toyFilterContainer"
      >
        <input
          type="text"
          v-model="filterBy.name"
          @input="setFilterBy"
          placeholder="Search toys..."
        />
        <select v-model="filterBy.status" @change="setFilterBy">
  <option v-for="option in options" :key="option">{{ option }}</option>
</select>


        <select v-model="filterBy.labels" @change="setFilterBy" multiple>
          <option :value="null">All Labels</option>
          <option v-for="label in labelOptions" :key="label" :value="label">
            {{ label }}
          </option>
        </select>

        <div class="sortby-container">
          <select v-model="sortBy.val" @change="setSortBy">
            <option>Sort by</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>

          <label class="sort-btn" @click="setSortBy">
            <span class="arrow">{{ arrow }}</span>
          </label>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { utilService } from './../services/util-service.js'
export default {
  data() {
    return {
      showFilter: true,
      filterBy: {
        name: '',
        status: 'All',
        labels: [],
      },
      sortBy: {
        val: 'Sort by',
        isAsc: true,
      },
      options: ['All', 'In stock', 'Out of stock'],
      labelOptions: [
        'Battery Powered',
        'Box game',
        'Art',
        'Baby',
        'Doll',
        'Puzzle',
        'Outdoor',
      ],
    }
  },
  created() {
    this.setFilterBy = utilService.debounce(this.setFilterBy)
    this.setSortBy()
  },
  methods: {
    toggleFilter(visible) {
    if (!visible && this.filterBy.name) {
      return;
    }
    this.showFilter = visible;
  },
  setFilterBy() {
  const parsedStatus =
    this.filterBy.status === 'In stock'
      ? true
      : this.filterBy.status === 'Out of stock'
      ? false
      : 'All';
  this.$emit('setFilterBy', { ...this.filterBy, status: parsedStatus });
},




    setSortBy() {
      this.$emit('setSortBy', this.sortBy)
      this.sortBy.isAsc = !this.sortBy.isAsc
    },
  },
  computed: {
    arrow() {
      return this.sortBy.isAsc ? '⬇' : '⬆'
    },
  },
}
</script>
