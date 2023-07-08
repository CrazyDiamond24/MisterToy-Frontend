import { storageService } from './asyncStorage.service.js'
import { httpService } from './http.service.js'
const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
// const BASE_URL = 'user/'
export const userService = {
  getLoggedInUser,
  login,
  logout,
  signup,
  get,
}

function getLoggedInUser() {
  const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
  console.log('inside service getlogdin user function', JSON.parse(str))
  return JSON.parse(str)
}

//   const credentials = { name: 'itay', password: '123' }

function login(credentials) {
  console.log('serivce login', credentials)

  return httpService.post('auth/login', credentials).then((user) => {
    _saveUserToStorage(user)
    return user
  })
}

function logout() {
  return httpService.delete('auth/logout')
  //   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  //   return Promise.resolve()
}

function signup(credentials) {
  return httpService.post('auth/signup', credentials).then((user) => {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
  })

}

function get(userId) {
  return storageService.get(USER_KEY, userId)
}

function _saveUserToStorage(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}
