import SimpleCard from "component/common/Card/SimpleCard";
import useSocket from "hook/socket";
import { AppState } from "model/state";
import React, { useEffect, useState } from "react";
import { getStateByName } from "service/state";

export const Dashboard: React.FC = () => {
	const [socket] = useSocket();
	const [state, setState] = useState<AppState>({
		date: "",
	});

	const handleUpdate = (payload: string) => {
		const datum = JSON.parse(payload) as Record<"props", AppState>;
		setState(datum.props);
	};

	useEffect(() => {
		getStateByName("myApp").then((response) => setState(response.props));
	}, []);

	useEffect(() => {
		socket.on("update", handleUpdate);
	}, [socket]);

	const sendMessage = () => {
		console.log("fired");
		socket.emit("action", {
			type: "SET_DATE",
			group: "myApp",
			payload: "2020-05-04",
		});
	};

	return (
		<div className="flex">
			<div className="mx-8">
				<p>current date {state.date}</p>
				<button onClick={sendMessage}>SEND</button>
				<SimpleCard>
					<p className="text-gray-500">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut endddim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu
						fugiat nulla pariatur. Excepteur sint occaecat cupidatat
						non proident, sunt in culpa qui officia deserunt mollit
						anim id est laborum.
					</p>
				</SimpleCard>
			</div>
		</div>
	);
};

export default Dashboard;
