import axios from "axios";

export default axios.create({
    params: {
        key: "5c7662991a634630859ccc42235ab003",
    },
    baseURL: "https://api.rawg.io/api",
    });