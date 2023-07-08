import { utilService } from './util-service.js'

// export const storageService = {
//     query,
//     getById,
//     put,
//     post,
//     remove,
//     getLabels,
// }

// function query(key, filter) {
//     var toys = utilService.loadFromStorage(key)
//     if (!toys || !toys.length) toys = _createToys(key)
//     if (!filter) return Promise.resolve(toys)
//     return _filterToys(toys, filter)
// }

// function getById(key, toyId) {
//     const toys = utilService.loadFromStorage(key)
//     const toy = toys.find(toy => toy._id === toyId)
//     return Promise.resolve(toy)
// }

// function put(key, toyToSave) {
//     const toys = utilService.loadFromStorage(key)
//     const idx = toys.findIndex(toy => toy._id === toyToSave._id)
//     toys.splice(idx, 1, toyToSave)
//     utilService.saveToStorage(key, toys)
//     return Promise.resolve(toyToSave)
// }

// function post(key, toyToSave) {
//     toyToSave._id = utilService.makeId()
//     toyToSave.createdAt = Date.now()

//     const toys = utilService.loadFromStorage(key)
//     toys.unshift(toyToSave)
//     utilService.saveToStorage(key, toys)
//     return Promise.resolve(toyToSave)
// }

// function remove(key, toyId) {
//     const toys = utilService.loadFromStorage(key)

//     const idx = toys.findIndex(toy => toy._id === toyId)
//     if (idx === -1) return Promise.reject('no such toy')

//     toys.splice(idx, 1)
//     utilService.saveToStorage(key, toys)
//     return Promise.resolve('removed')
// }

// function getLabels() {
//     return Promise.resolve([
//         'On wheels',
//         'Box game',
//         'Art',
//         'Baby',
//         'Doll',
//         'Puzzle',
//         'Outdoor',
//     ])
// }

// function _filterToys(toyToFilter, filter) {
//     var toys = [...toyToFilter]

//     const { filterBy, sortBy } = filter
//     console.log(filter)
//     if (filterBy.name) {
//         const regex = new RegExp(filterBy.name, 'i')
//         toys = toys.filter(toy => regex.test(toy.name))
//     }
//     if (filterBy.inStock) {
//         toys = toys.filter(toy => toy.inStock === filterBy.inStock)
//     }
//     if (filterBy.labels.length) {
//         toys = toys.filter(toy => {
//             return filterBy.labels.every(label => toy.labels.includes(label))
//         })
//     }
//     if (sortBy.name) toys = toys.sort((a, b) => a.name.localeCompare(b.name) * sortBy.diff)
//     if (sortBy.price) toys = toys.sort((a, b) => (a.price - b.price) * sortBy.diff)
//     if (sortBy.created) toys = toys.sort((a, b) => (a.createAt - b.createAt) * sortBy.diff)

//     return Promise.resolve(toys)
// }

// function _createToys(key) {
//     const toys = []
//     for (let i = 0; i < 10; i++) {
//         const toy = {
//             _id: utilService.makeId(),
//             name: utilService.makeId(8),
//             price: utilService.getRandomInt(10, 100),
//             createAt: Date.now(),
//             inStock: true,
//         }
//         toys.push(toy)
//     }
//     utilService.saveToStorage(key, toys)
//     return toys
// }

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType, filterBy = {}) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  if (filterBy.toyId || filterBy.userId) {
    entities = entities.filter((review) => {
      return (
        (filterBy.toyId ? review.toyId === filterBy.toyId : true) &&
        (filterBy.userId ? review.userId === filterBy.userId : true)
      )
    })
  }
  return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    return entity
  })
}

function post(entityType, newEntity) {
  newEntity = JSON.parse(JSON.stringify(newEntity))
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function put(entityType, updatedEntity) {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      )
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}

//without lines

// const delay = 700

// export const storageService = {
//     query,
//     get,
//     post,
//     put,
//     remove,
//     postMany,
//     queryWithDelay,
// }

// function queryWithDelay(entityType) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(query(entityType))
//         }, delay)
//     })
// }

// function query(entityType) {
//     var entities = JSON.parse(localStorage.getItem(entityType)) || []
//     return Promise.resolve(entities)
// }

// function get(entityType, entityId) {
//     return query(entityType).then(entities => entities.find(entity => entity._id === entityId))
// }

// function post(entityType, newEntity) {
//     newEntity._id = utilService.makeId()
//     return query(entityType).then(entities => {
//         entities.push(newEntity)
//         _save(entityType, entities)
//         return newEntity
//     })
// }

// function postMany(entityType, newEntities) {
//     return query(entityType).then(entities => {
//         entities.push(...newEntities)
//         _save(entityType, entities)
//         return entities
//     })
// }

// function put(entityType, updatedEntity) {
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
//         entities.splice(idx, 1, updatedEntity)
//         _save(entityType, entities)
//         return updatedEntity
//     })
// }

// function remove(entityType, entityId) {
//     return query(entityType).then(entities => {
//         const idx = entities.findIndex(entity => entity._id === entityId)
//         const [removed] = entities.splice(idx, 1)
//         _save(entityType, entities)
//         return removed
//     })
// }

// function _save(entityType, entities) {
//     localStorage.setItem(entityType, JSON.stringify(entities))
// }
