import { useRef, useState, useCallback } from "react";

/**
 * useWebRTC — manages local/remote streams for live interview rooms.
 * Full implementation will use RTCPeerConnection + Socket.io signaling.
 */
const useWebRTC = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const startLocalStream = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setIsConnected(true);
    } catch (err) {
      console.error("Failed to start local stream:", err);
    }
  }, []);

  const toggleMute = useCallback(() => setIsMuted((prev) => !prev), []);
  const toggleCamera = useCallback(() => setIsCameraOff((prev) => !prev), []);

  return {
    localVideoRef,
    remoteVideoRef,
    isConnected,
    isMuted,
    isCameraOff,
    startLocalStream,
    toggleMute,
    toggleCamera,
  };
};

export default useWebRTC;
