import ENV from "env";
import { useEffect, useRef } from "react";
import io from "socket.io-client";

const useSocket = () => {
	const { current: socket } = useRef(io(ENV.API));

	useEffect(() => {
		return () => {
			socket && socket.removeAllListeners();
			socket && socket.close();
		};
	}, [socket]);

	return [socket];
};

export default useSocket;
