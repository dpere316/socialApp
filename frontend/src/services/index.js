import axios from "axios";
let baseURL;

process.env.NODE_ENV === "production"
  ? (baseURL = "/api") //https://rocky-ocean-03987.herokuapp.com/
  : (baseURL = "http://localhost:5000/api");

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get("/is-logged-in");
  },
  signUp: async (user) => {
    return await service.post("/signup", user);
  },
  logIn: async (user) => {
    return await service.post("/login", user);
  },
  logOut: async () => {
    return await service.get("/logout");
  },
  getStyles: async () => {
    return await service.get("/home");
  },
  findUsers: async () => {
    return await service.get("/find-users");
  },
  getFriends: async () => {
    return await service.get("/get-friends");
  },
  addFriend: async (friend) => {
    return await service.post("/add-friends", friend);
  },
  addSong: async (song) => {
    console.log(song);
    return await service.post("/song", { song });
  },
  removeFriend: async (friend) => {
    return await service.post("/remove-friends", friend);
  },
  deleteTheme: async (theme) => {
    return await service.post("/remove-theme", theme);
  },
  updateStatus: async (status) => {
    return await service.post("/add-status", status);
  },
  retriveStatus: async () => {
    return await service.get("/get-status");
  },
  userStatus: async (id) => {
    return await service.get(`/user-status?id=${id}`);
  },
  changeProfilePic: async (profilePic) => {
    console.log(profilePic);
    return await service.post("/api/uploadfile", profilePic);
  },
  addProfilePic: async (profilePic) => {
    return await service.get("/api/uploadfile", profilePic);
  },
  getProfile: async () => {
    return await service.get("/profile");
  },
  postProfile: async (styles) => {
    return await service.post("/profile", styles);
  },
  getOtherProfile: async (id) => {
    return await service.post("/other-profile", { id });
  },
};

export default actions;
