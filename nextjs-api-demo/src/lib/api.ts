import axios from "axios";
import https from "https";
import Cookies from "js-cookie";

const agent = new https.Agent({
    rejectUnauthorized: false, // ignore cert ! WARNING: DO NOT INCLUDE IN PROD ! 
});

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials : true,
    withXSRFToken : true,
    xsrfCookieName : "XSRF-TOKEN",
    httpsAgent: agent,
    headers: {
        "X-Requested-With" : "XMLHttpRequest",
        "Accept" : "application/json",
        "Content-Type" : "application/json",
    },

});

/*axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
axios.defaults.xsrfHeaderName = "XSRF-TOKEN";*/


export default api;