import { storageService } from './asyncStorage.service.js'
import { utilService } from './util-service.js'
import { httpService } from './http.service.js'
//FRONTEND
export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getLabels,
}

const labels = [
  'Battery Powered',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
]
function getLabels() {
  return labels
}

console.log('Toy service is up')
const KEY = 'toy_DB'
// _createToys()

const BASE_URL = 'toy/'

function query(filter) {
  // return storageService.query(KEY, filter)
  // console.log(filter)
  return httpService.get(BASE_URL, filter)
}


function getById(toyId) {
  return httpService
    .get(BASE_URL + toyId)
    .then((response) => {
      console.log('Response:', response)
      return response
    })
    .catch((error) => {
      console.log('Error:', error)
      throw error
    })
}

function save(toyToSave) {
  // if (toyToSave._id) return storageService.put(KEY, toyToSave)
  // else return storageService.post(KEY, toyToSave)
  console.log('toyToSave:', toyToSave);
  if (toyToSave._id) return httpService.put(BASE_URL + toyToSave._id, toyToSave)
  else return httpService.post(BASE_URL, toyToSave)
}

function remove(toyId) {
  // return storageService.remove(KEY, toyId)
  console.log('Removing toy with ID:', toyId)
  return httpService.delete(BASE_URL + toyId)
}

function getEmptyToy() {
  return {
    name: '',
    price: null,
    labels: ['Doll', 'Battery Powered', 'Baby'],
    inStock: true,
  }
}

// function _createToys() {
//   var toys = JSON.parse(localStorage.getItem(KEY))
//   if (!toys || !toys.length) {
//     toys = [
//       _createToy(
//         'Talking Doll',
//         123,
//         ['Doll', 'Battery Powered', 'Baby'],
//         ['Good', 'Nice', 'Fun'],
//         'doll toy',
//         new Date('2023-03-13').toLocaleString(),
//         `https://www.johnadams.co.uk/wp-content/uploads/2016/07/Tiny_Tears_Interactive_3D_Box.png`
//       ),
//       _createToy(
//         'Ball',
//         50,
//         ['Outdoor', 'Baby'],
//         ['Amazing!'],
//         'pool ball colorful',
//         new Date('2023-03-12').toLocaleString(),
//         `https://www.petfoodnmore.com/wp-content/uploads/Kaytee/Kaytee-Run-About-Ball-Assorted-Medium-lg.png`
//       ),
//       _createToy(
//         'Playing Cards',
//         250,
//         ['Box game'],
//         ['wow!', 'awesome'],
//         'cards deck playing',
//         new Date('2023-03-11').toLocaleString(),
//         `https://cdn.shopify.com/s/files/1/0150/0643/3380/products/SB-POD_DC-09_grande.png?v=1617395765`
//       ),
//       _createToy(
//         'Doll house',
//         250,
//         ['Doll'],
//         ['My daughter likes it', 'Broken piece'],
//         'cards deck playing',
//         new Date('2023-03-11').toLocaleString(),
//         `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/14b64b63-ffe0-458a-bcc1-bc0130d53168/d80od6s-899ae2eb-6393-46b3-9634-56c116fee16f.png`
//       ),
//       _createToy(
//         'Firefighter Truck',
//         250,
//         ['Battery Powered', 'Baby'],
//         [
//           'Got this as a gift for my nephew, loved it',
//           'Haha James plays with it all day!',
//         ],
//         'cards deck playing',
//         new Date('2023-03-11').toLocaleString(),
//         `https://i.ebayimg.com/images/g/cp4AAOSwZdBfYK7e/s-l500.png`
//       ),
//       _createToy(
//         'RainboCorns',
//         250,
//         ['Baby', 'Doll'],
//         ['All kids love these', 'Useless but ok'],
//         'cards deck playing',
//         new Date('2023-03-11').toLocaleString(),
//         `https://i5.walmartimages.com/asr/ed9c940f-0ef0-4c58-8023-8315e817a612_5.dbac582e879f29077527c583aa1e08a6.png`
//       ),
//     ]
//     localStorage.setItem(KEY, JSON.stringify(toys))
//   }
// }

// function _createToy(name, price, labels, reviews, keyword, createdAt, image) {
//   return {
//     name,
//     price,
//     labels,
//     inStock: true,
//     createdAt,
//     reviews: reviews,
//     keyword: '',
//     image: image || `https://source.unsplash.com/400x300/?${keyword}`,
//   }
// }
