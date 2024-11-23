import axios from "axios";

import Echo from "laravel-echo";
import Pusher from "pusher-js";


const echo = new Echo({
    broadcaster: "reverb",
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    wsHost: process.env.NEXT_PUBLIC_WS_HOST,
    wsPort: process.env.NEXT_PUBLIC_HOST_PORT ?? 80,
    encrypted: true,
    forceTLS: false,
    disableStats: true,
    authorizer: ({channel, options} : any) => {
        return {
            authorize: ({socketId, callback} : any) => {
                axios.post('api/broadcasting/auth', {
                    socket_Id : socketId,
                    channel_name : channel.name
                })
                .then(response => {
                    callback(false, response.data);
                })
                .catch(error => {
                    callback(true, error);
                })
            }
        }
    }

});

export default echo;