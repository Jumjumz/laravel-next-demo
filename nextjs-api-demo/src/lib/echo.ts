import axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";


const echo = new Echo({
    broadcaster: "pusher",
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_WS_HOST,
    wsPort: process.env.NEXT_PUBLIC_HOST_PORT ?? 80,
    forceTLS: false,
    disableStats: true,
    authorizer: (channel, options) => {
        return {
            authorize: (socketId, callback) => {
                axios.post('api/broadcasting/auth', {

                })
            }
        }
    }

});

export default echo;