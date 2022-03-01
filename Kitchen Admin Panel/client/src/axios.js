import axios from "axios";

const instance = axios.create({
  baseURL: "https://kitchen-admin-panel.herokuapp.com/",
});

export default instance;
