import axios from "axios";
import https from "https";

/*const agent = new https.Agent({
    rejectUnauthorized: true,
});*/

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    //httpAgent: agent,
    headers: {
        "X-Requested-With" : "XMLHttpRequest"
    },
    withCredentials: true
});
