import axios from "axios";
import https from "https";
import Cookies from "js-cookie";

const agent = new https.Agent({
    rejectUnauthorized: false, // ignore cert ! WARNING: DO NOT INCLUDE IN PROD ! 
});

axios.interceptors.request.use(async (config) => {
    await axios.get("/sanctum/csrf-cookie").then();
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    //config.headers.Authorization = `Bearer ${Cookies.get('laravel_session')}`;
    //console.log("test", Cookies.get('X-XSRF-TOKEN'));
    return config;
});


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    httpsAgent: agent,
    headers: {
        "X-Requested-With" : "XMLHttpRequest",
        "Accept" : "application/json",
    }, 
});

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfHeaderName = "XSRF-TOKEN";


export default api;