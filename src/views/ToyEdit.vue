<template>
    <section class="toy-edit-container">
      <h1 class="toy-edit-header padding-m-y">TOY EDIT</h1>
      <form>
        <label>
          Title
          <input type="text" v-model="updatedToy.name" />
        </label>
        <label>
          Price
          <input type="number" v-model="updatedToy.price" />
        </label>
        <label >
          Labels
          <select multiple v-model="updatedToy.labels">
            <option v-for="label in availableLabels" :value="label">{{ label }}</option>
          </select>
        </label>
        <div class="btns flex align-center">
          <button class="edit-save-btn btn" @click.prevent="save(updatedToy)">Save</button>
          <router-link to="/toy" class="edit-back-btn">Back</router-link>
        </div>
      </form>
    </section>
  </template>

<script>
export default {
  data() {
    return {
      updatedToy: {
        name: '',
        price: '',
        labels: [],
        toyId: null,
      },
      newLabel: '',
      selectedLabels: [],
      availableLabels: [
        'Doll',
        'Battery Powered',
        'Baby',
        'Outdoor',
        'Box game',
        'Puzzle',
        'Art',
      ],
    }
  },
  created() {
    this.getToyById()
  },
  methods: {
    getToyById() {
      var toyId = this.$route.params.id
      if (toyId) {
        this.$store.dispatch({ type: 'getToyById', toyId }).then((toy) => {
          var currToyCopy = JSON.parse(JSON.stringify(toy))
          this.updatedToy = currToyCopy
        })
      }
    },

    save() {
  const action = this.updatedToy._id ? 'updated' : 'added'
  this.$store
    .dispatch({ type: 'saveToy', toy: this.updatedToy })
    .then(() => {
      this.$router.push('/toy')
    })
    .then(() => {
    console.log('ok')
    })
    .catch((error) => {
        console.error('Error saving toy:', error)
        // You can also show a notification or an alert to the user here, if needed.
      }) 
},


    addLabel() {
      if (!this.newLabel) return
      if (this.selectedLabels.indexOf(this.newLabel) === -1) {
        this.selectedLabels.push(this.newLabel)
        this.updatedToy.labels.push(this.newLabel)
      }
      this.newLabel = ''
    },

    removeLabel(index) {
      this.selectedLabels.splice(index, 1)
      this.updatedToy.labels.splice(index, 1)
    },
  },
}

</script>