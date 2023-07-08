<template>
  <section class="toy-index">
    <div class="toy-index-container">
      <ToyFilter
        :toys="toys"
        @setFilterBy="setFilterBy"
        @setSortBy="setSortBy"
        class="toy-filter-container"
      />

      <router-link to="toy/edit/" class="add-toy-link">Add Toy</router-link>
      <ToyList :toys="toys" @remove-toy="removeToy" />
    </div>

    <div class="paging">
      <button @click="setPage(-1)">Prev</button>
      <button @click="setPage(1)">Next</button>
    </div>
  </section>
</template>

<script>
import ToyList from '../components/ToyList.vue'
import ToyFilter from '../components/ToyFilter.vue'
import { mapState } from 'vuex'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
export default {
  name: 'ToyIndex',

  computed: {
    ...mapState(['sortBy']),
    toys() {
      return this.$store.getters.filteredSortedPagedToys
    },
  },
  created() {
    this.setFilterBy(
      this.$store.state.filterBy || {
        status: 'All',
        name: '',
        page: 0,
        selectedLabels: [],
      }
    )
  },
  components: {
    ToyList,
    ToyFilter,
  },
  methods: {
    removeToy(toyId) {
      this.$store
        .dispatch('removeToy', { toyId })
        .then(() => {
          showSuccessMsg('Todo updated')
        })
        .catch((err) => {
          showErrorMsg('Cannot update todo')
        })
    },
    setFilterBy(filterBy) {
      this.$store.dispatch({
        type: 'setFilterBy',
        filterBy,
      })
    },
    setSortBy(sortBy) {
      console.log(sortBy, 'sortby from parent cmp')
      this.$store.dispatch('setSortBy', sortBy)
    },
    async setPage(diff) {
      console.log(
        'Before setPage dispatch:',
        diff,
        this.$store.state.toyStore.filterBy.page
      )
      await this.$store.dispatch('setPage', { diff })
      console.log(
        'After setPage dispatch:',
        this.$store.state.toyStore.filterBy.page
      )
    },
  },
  watch: {
    sortBy: {
      handler() {
        this.setFilterBy(this.$store.state.filterBy)
      },
      deep: true,
    },
  },
}
</script>

<style></style>
