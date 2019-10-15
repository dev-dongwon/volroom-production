import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://server-dev.ap-northeast-2.elasticbeanstalk.com/"
});

export default axios;
