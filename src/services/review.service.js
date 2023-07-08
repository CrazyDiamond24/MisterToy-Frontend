// import { httpService } from './http.service'
import { storageService } from './asyncStorage.service.js'
import { userService } from './user.service.js'

// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
checkAndInitializeReviews();
function checkAndInitializeReviews() {
  const existingReviews = localStorage.getItem('review');
  if (!existingReviews) {
    _initializeReviews();
  }
}

function _initializeReviews() {
  const reviews = [
    {
      _id: 'r1',
      userId: 'u1',
      toyId: 't1',
      content: 'This toy is great!',
    },
  ]

  localStorage.setItem('review', JSON.stringify(reviews))
}

;(() => {
  setTimeout(() => {
    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    //   console.log('GOT from socket', review)
    //   store.commit({type: 'addReview', review})
    // })
    // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
    //   showSuccessMsg(`New review about me ${review.txt}`)
    // })
  }, 0)
})()

export const reviewService = {
  add,
  query,
  remove,
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?toy=${filterBy.toyId}&user=${filterBy.userId}`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.delete('review', reviewId)
}
async function add(review) {
  // const addedReview = await httpService.post(`review`, review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  const addedReview = await storageService.post('review', review)

  return addedReview
}
