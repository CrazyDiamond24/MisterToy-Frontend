import { toyService } from '../../services/toy.service.js'
import { userStore } from './user.store.js'

const PAGE_SIZE = 5

export default {
  strict: true,
  state: {
    toys: [],
    filterBy: { status: 'All', name: '', page: 0, selectedLabels: [] },
    sortBy: null,
    labels: toyService.getLabels(),
    inventories: null,
  },
  mutations: {
    setTotalToys(state, { totalToys }) {
      state.totalToys = totalToys
    },
    updatePage(state, { page }) {
      state.filterBy.page = page
    },
    // setPage(state, { page }) {
    //   state.filterBy.page = page;
    // },
    chartToys(state, { toys }) {
      state.chartToys = toys
    },
    setToys(state, { toys }) {
      state.toys = toys
    },
    removeToy({ toys }, { toyId }) {
      const idx = toys.findIndex((toy) => toy._id === toyId)
      if (idx === -1) {
        console.log("Can't remove toy " + toyId)
        return
      }
      toys.splice(idx, 1)
    },
    addToy({ toys }, { toy }) {
      console.log('Adding!!')
      toys.push(toy)
    },
    updateToy({ toys }, { toy }) {
      const idx = toys.findIndex((_toy) => _toy._id === toy._id)
      if (idx === -1) {
        console.log("Can't update toy " + toy._id)
        return
      }
      toys.splice(idx, 1, toy)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = { ...state.filterBy, ...filterBy }
      console.log(state.filterBy)
    },
    updateSortBy(state, sortBy) {
      console.log(sortBy, 'from mutation')
      state.sortBy = { ...sortBy }
    },
    // setSortBy(state, { sortBy }) {
    //   state.sortBy = sortBy
    // },

    // setPage(state, { diff }) {
    //   const toyLength = state.toys?.length
    //   let maxPage = toyLength / PAGE_SIZE
    //   if (Number.isInteger(toyLength / PAGE_SIZE)) maxPage--
    //   else maxPage = Math.floor(maxPage)

    //   let page = state.filterBy.page + diff
    //   if (page < 0) state.filterBy.page = maxPage
    //   else if (page > maxPage) state.filterBy.page = 0
    //   else state.filterBy.page = page
    // },
  },
  actions: {
    setSortBy({ commit }, sortBy) {
      console.log(sortBy, 'sortby from store action')
      commit('updateSortBy', sortBy)
    },
    setPage({ commit, state, dispatch }, { diff }) {
      console.log('Store state inside setPage action:', state)
      console.log('Received diff value:', diff)

      const totalToys = state.totalToys

      let maxPage = Math.floor(totalToys / PAGE_SIZE)
      if (totalToys % PAGE_SIZE == 0) maxPage--

      let newPage = state.filterBy.page + diff
      console.log('Calculated new page value:', newPage)

      if (newPage < 0) newPage = maxPage
      else if (newPage > maxPage) newPage = 0

      // Create a new filterBy object with the updated page property
      const newFilterBy = { ...state.filterBy, page: newPage }

      // Trigger the setFilterBy action with the updated filterBy object
      console.log('New filterBy object:', newFilterBy)

      dispatch('setFilterBy', { filterBy: newFilterBy })
        .then(() => {
          console.log('Page updated successfully')
        })
        .catch((error) => {
          console.error('Error updating page:', error)
        })
    },

    setFilterBy({ commit }, { filterBy }) {
      console.log('setFilterBy action received filterBy object:', filterBy)
      filterBy.page =
        filterBy.page !== undefined && !isNaN(filterBy.page) ? filterBy.page : 0
      commit({ type: 'updatePage', page: filterBy.page }) // Add this line
      const page = filterBy.page
      const pageSize = PAGE_SIZE
      const labels = Array.isArray(filterBy.labels)
        ? filterBy.labels.slice()
        : [] // Convert Proxy to Array
      filterBy.labels = labels
      return toyService
        .query(filterBy, page, pageSize)
        .then(({ toys, totalToys }) => {
          // Receive toys and totalToys
          commit({ type: 'setToys', toys })
          commit({ type: 'setTotalToys', totalToys }) // Commit totalToys to state
          console.log('toys', toys, 'total toys', totalToys)
        })
        .catch((error) => {
          console.error('Error fetching toys:', error)
        })
        .finally(() => {
          console.log('After setFilterBy', filterBy)
        })
    },

    loadToysChart({ commit }) {
      return toyService.query().then((toys) => {
        commit({ type: 'chartToys', toys })
      })
    },
    loadToys({ commit }) {
      toyService
        .query()
        .then((toys) => {
          commit({ type: 'setToys', toys })
        })
        .catch((err) => {
          throw err
        })
    },
    removeToy({ commit, rootGetters }, { toyId }) {
      const loggedInUser = rootGetters.user

      console.log('inside remove toy in toy store: loggedInUser:', loggedInUser)
      console.log(
        'inside remove toy in toy store: isAdmin:',
        loggedInUser?.isAdmin
      )

      if (!loggedInUser || !loggedInUser.isAdmin) {
        console.error('Unauthorized: Only admin users can remove a toy.')
        return Promise.reject(
          new Error('Unauthorized: Only admin users can remove a toy.')
        )
      }

      console.log('Store remove toyId', toyId)
      return toyService.remove(toyId).then((removedToy) => {
        commit({ type: 'removeToy', toyId })
      })
    },

    saveToy({ commit, rootGetters }, { toy }) {
      console.log('Saving')
      const loggedInUser = rootGetters.user
      const isEdit = toy._id
      if (!loggedInUser || !loggedInUser.isAdmin) {
        console.error('Unauthorized: Only admin users can edit/add a toy.')
        return Promise.reject(
          new Error('Unauthorized: Only admin users can edit/add a toy.')
        )
      }
      return toyService.save(toy).then((toy) => {
        const type = isEdit ? 'updateToy' : 'addToy'

        commit({ type, toy })
      })
    },
    getToyById(context, { toyId }) {
      console.log(context)
      return toyService.getById(toyId)
    },
  },
  getters: {
    filteredSortedPagedToys(state) {
      console.log(state.toys, 'all the toys supposedly in long getter')
      let sortedToys = [...state.toys] 
      console.log(sortedToys,'sotyed toys in long getter')

      if (state.sortBy && state.sortBy.val !== 'Sort by') {
        sortedToys.sort((a, b) => {
          if (state.sortBy.val === 'name') {
            return state.sortBy.isAsc
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          } else if (state.sortBy.val === 'price') {
            return state.sortBy.isAsc ? a.price - b.price : b.price - a.price
          } else {
            // Handle additional sorting criteria if needed
            return 0
          }
        })
      }

      return sortedToys
    },

    priceData({ chartToys, labels }) {
      let data = labels.map((label) =>
        chartToys
          .filter((toy) => toy.labels.includes(label))
          .reduce((acc, toy) => {
            return acc + toy.price
          }, 0)
      )
      return data
    },
    inventorysData({ chartToys, labels }) {
      let inventories = labels.map((label) => {
        let filteredToys = chartToys.filter((toy) => {
          return toy.labels.includes(label)
        })
        return filteredToys.length
      })
      return inventories
    },
    toys(state) {
      return state.toys
    },
    labels({ labels }) {
      return labels
    },
    toysForDisplay(state) {
      return state.toys
    },
    labels(state) {
      return state.labels
    },
  },
}

// import { filter } from 'lodash'
// import { toyService } from '../../services/toy.service.js'

// const PAGE_SIZE = 5

// export default {
//   strict: true,
//   state: {
//     toys: null,
//     filterBy: { status: 'All', name: '', page: 0, selectedLabels: [] },
//     sortBy: null,
//     labels: toyService.getLabels(),
//     inventories: null,
//   },
//   mutations: {
//     chartToys(state, { toys }) {
//       state.chartToys = toys
//     },
//     setToys(state, { toys }) {
//       state.toys = toys
//     },
//     removeToy({ toys }, { toyId }) {
//       const idx = toys.findIndex((toy) => toy._id === toyId)
//       if (idx === -1) {
//         console.log("Can't remove toy " + toyId)
//         return
//       }
//       toys.splice(idx, 1)
//     },
//     addToy({ toys }, { toy }) {
//       console.log('Adding!!')
//       toys.push(toy)
//     },
//     updateToy({ toys }, { toy }) {
//       const idx = toys.findIndex((_toy) => _toy._id === toy._id)
//       if (idx === -1) {
//         console.log("Can't update toy " + toy._id)
//         return
//       }
//       toys.splice(idx, 1, toy)
//     },
//     setFilterBy(state, { filterBy }) {
//       state.filterBy = { ...state.filterBy, ...filterBy }
//       console.log(state.filterBy)
//     },
//     setSortBy(state, { sortBy }) {
//       state.sortBy = sortBy
//     },
//     setPage(state, { diff }) {
//       const toyLength = state.toys?.length
//       let maxPage = toyLength / PAGE_SIZE
//       if (Number.isInteger(toyLength / PAGE_SIZE)) maxPage--
//       else maxPage = Math.floor(maxPage)

//       let page = state.filterBy.page + diff
//       if (page < 0) state.filterBy.page = maxPage
//       else if (page > maxPage) state.filterBy.page = 0
//       else state.filterBy.page = page
//     },
//   },
//   actions: {
//     setFilterBy({commit}, {filterBy}) {
//       console.log(filterBy)
//       return toyService.query(filterBy).then((toys) => {
//         commit({ type: 'setToys', toys })
//       })
//     },
//     loadToysChart({ commit }) {
//       return toyService.query().then((toys) => {
//         commit({ type: 'chartToys', toys })
//       })
//     },
//     loadToys({ commit }) {
//       toyService
//         .query()
//         .then((toys) => {
//           commit({ type: 'setToys', toys })
//         })
//         .catch((err) => {
//           throw err
//         })
//     },
//     removeToy({ commit }, { toyId }) {
//       console.log('Store remove toyId', toyId)
//       return toyService.remove(toyId).then((removedToy) => {
//         commit({ type: 'removeToy', toyId })
//       })
//     },
//     saveToy({ commit }, { toy }) {
//       console.log('Saving')
//       const isEdit = toy._id
//       return toyService.save(toy).then((toy) => {
//         const type = isEdit ? 'updateToy' : 'addToy'

//         commit({ type, toy })
//       })
//     },
//     getToyById(context, { toyId }) {
//       console.log(context)
//       return toyService.getById(toyId)
//     },
//   },
//   getters: {
//     priceData({ chartToys, labels }) {
//       let data = labels.map((label) =>
//         chartToys
//           .filter((toy) => toy.labels.includes(label))
//           .reduce((acc, toy) => {
//             return acc + toy.price
//           }, 0)
//       )
//       return data
//     },
//     inventorysData({ chartToys, labels }) {
//       let inventories = labels.map((label) => {
//         let filteredToys = chartToys.filter((toy) => {
//           return toy.labels.includes(label)
//         })
//         return filteredToys.length
//       })
//       return inventories
//     },
//     toys(state) {
//       return state.toys
//     },
//     labels({ labels }) {
//       return labels
//     },
//     toysForDisplay(state) {
//       return state.toys
//       // const asc = state.sortBy?.isAsc ? -1 : 1
//       // let filteredToys

//       // // Filter by name and stock status
//       // if (!state.filterBy.name && state.filterBy.status === 'All') {
//       //   filteredToys = JSON.parse(JSON.stringify(state.toys))
//       // } else {
//       //   if (state.filterBy.status === 'In stock') {
//       //     filteredToys = state.toys.filter((toy) => toy.inStock)
//       //   } else if (state.filterBy.status === 'Out of stock') {
//       //     filteredToys = state.toys.filter((toy) => !toy.inStock)
//       //   } else {
//       //     filteredToys = state.toys
//       //   }
//       //   filteredToys = filteredToys.filter((toy) =>
//       //     new RegExp(state.filterBy.name, 'i').test(toy.name)
//       //   )
//       // }

//       // // Filter by selected labels
//       // const selectedLabels = state.filterBy.labels
//       // if (selectedLabels && selectedLabels.length > 0) {
//       //   filteredToys = filteredToys.filter((toy) =>
//       //     selectedLabels.every((label) => toy.labels.includes(label))
//       //   )
//       // }

//       // // Paginate and sort
//       // let startIdx = state.filterBy.page * PAGE_SIZE
//       // let endIdx = startIdx + PAGE_SIZE

//       // const sortBy = state.sortBy?.val
//       // return filteredToys
//       //   ?.slice(startIdx, endIdx)
//       //   .sort((t1, t2) => (t1[sortBy] > t2[sortBy] ? 1 * asc : -1 * asc))
//     },
//     labels(state) {
//       return state.labels
//     },

//   },
// }
