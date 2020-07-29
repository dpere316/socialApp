import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  // ? (baseURL = 'https://sheltered-dawn-07708.herokuapp.com')
  ? (baseURL = 'window.location.origin')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  },
  getStyles: async () => {
    return await service.get('/home')
  },
  updateStatus: async (status) => {
    return await service.post('/profile/status',status)
  },
  findFriends: async () => {
    return await service.get('/find-friends')
  },
  addFriend: async (friend) => {
    return await service.post('/add-friends',friend)
  },
  removeFriend: async (friend) => {
    return await service.post('/remove-friends',friend)
  },
  retriveStatus: async() => {
    return await service.get('/get-status')
  }

};

export default actions;
