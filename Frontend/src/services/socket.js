// Socket.io Service
// Install: pnpm add socket.io-client

// import { io } from "socket.io-client";

// const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
//   autoConnect: false,
//   withCredentials: true,
// });

// export const connectSocket = (token) => {
//   socket.auth = { token };
//   socket.connect();
// };

// export const disconnectSocket = () => socket.disconnect();

// export default socket;

const socket = {
  on: () => {},
  emit: () => {},
  off: () => {},
  connect: () => {},
  disconnect: () => {},
};

export default socket;
