import axios from "axios";
import https from "https";

const agent = new https.Agent({
    rejectUnauthorized: false, // ignore cert ! WARNING: DO NOT INCLUDE IN PROD ! 
});

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    httpsAgent: agent,
    headers: {
        "X-Requested-With" : "XMLHttpRequest",
        "Content-Type": "application/json",
    },
    withCredentials: true
});
