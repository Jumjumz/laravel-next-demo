import Echo from "laravel-echo";
import Pusher from "pusher-js";


const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_WS_HOST,
    wsPort: process.env.NEXT_PUBLIC_HOST_PORT,
    forceTLS: false,
    disableStats: true,

});

export default echo;