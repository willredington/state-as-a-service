import SimpleCard from "component/common/Card/SimpleCard";
import { ENV } from "env";
import useSocket from "hook/socket";
import React, { useEffect, useState } from "react";

import { getStateByName } from "service/state";
import Datepicker from "./Datepicker";
import Todos from "./Todos";

type CommonState = {
	date: string;
	todos: string[];
};

export const Dashboard: React.FC = () => {
	const [socket] = useSocket();
	const [state, setState] = useState<CommonState>();

	const handleUpdated = (newState: CommonState) => {
		if (newState) {
			console.log("got new state", newState);
			setState(newState);
		}
	};

	const sendDateMessage = (date: Date) => {
		socket.emit("update", {
			registryName: "myApp",
			actionName: "date",
			payload: date.toISOString().slice(0, 10),
		});
	};

	const sendTodosMessage = (todo: string) => {
		socket.emit("update", {
			registryName: "myApp",
			actionName: "todos",
			payload: todo,
		});
	};

	useEffect(() => {
		getStateByName<CommonState>(ENV.STATE_KEY).then((result) =>
			setState(result)
		);
	}, []);

	useEffect(() => {
		socket.on("updated", handleUpdated);
	}, [socket]);

	return (
		<div className="flex flex-col justify-center">
			<div className="mx-16">
				<SimpleCard>
					<p>Date: {state?.date}</p>
					<p>Todos</p>
					<ul>
						{state?.todos.map((todo) => (
							<li key={todo}>{todo}</li>
						))}
					</ul>
				</SimpleCard>
				<hr className="mb-8" />
				<SimpleCard>
					<Datepicker dateCallback={sendDateMessage} />
				</SimpleCard>
				<hr className="mb-8" />
				<SimpleCard>
					<Todos clickCallback={sendTodosMessage} />
				</SimpleCard>
			</div>
		</div>
	);
};

export default Dashboard;
