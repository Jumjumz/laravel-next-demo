import Echo from "laravel-echo";
import Pusher from "pusher-js";
import api from "./api";

//@ts-ignore
window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  wsHost: "api.demo.test",
  //wssHost: process.env.NEXT_PUBLIC_WS_HOST,
  wsPort: 443,
  //wssPort: process.env.NEXT_PUBLIC_HOST_PORT ?? 443,
  //forceTLS: (process.env.NEXT_PUBLIC_SCHEME ?? "https") === "https",
  forceTLS: true,
  encrypted: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  options: {
    rejectUnauthorized: false, // ignore ssl cert
  },
  authorizer: ({ channel, options }: any) => {
    return {
      authorize: ({ socketId, callback }: any) => {
        api
          .post("/api/broadcasting/auth", {
            socket_Id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

export default echo;
