import Axios from "axios";

const axios = Axios.create({
  // baseURL: "https://www.volroomup.space/"
    baseURL: "http://localhost:8081/"

});

export default axios;
