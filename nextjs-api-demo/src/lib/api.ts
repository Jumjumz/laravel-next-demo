import axios from "axios";
import https from "https";
import Cookies from "js-cookie";

const agent = new https.Agent({
    rejectUnauthorized: false, // ignore cert ! WARNING: DO NOT INCLUDE IN PROD ! 
});


export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    httpsAgent: agent,
    headers: {
        "X-Requested-With" : "XMLHttpRequest",
        "Accept" : "application/json",
        "Referer" : "localhost:3000",
    }, 
    withCredentials: true,
});

axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
    if((config.method as string).toLocaleLowerCase() !== 'get') {
        await axios.get("sanctum/csrf-cookie").then()
        config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }
    return config;
});