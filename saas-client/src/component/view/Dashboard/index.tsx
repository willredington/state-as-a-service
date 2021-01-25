import useSocket from "hook/socket";
import { StateItem } from "model/state";
import React, { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getStateByName } from "service/state";

export const Dashboard: React.FC = () => {
	const [socket] = useSocket();
	const [state, setState] = useState<StateItem>({
		name: "myApp",
		props: {
			data: new Date().toISOString().slice(0, 10),
		},
	});

	const selectedDate = useMemo(() => {
		if ("date" in state.props) {
			return new Date(state.props["date"]);
		}
	}, [state]);

	const handleDateChange = (value: Date | Date[]) => {
		console.log("value", value);
		if (value && !Array.isArray(value)) {
			sendMessage(value as Date);
		}
	};

	const handleUpdated = (newState: StateItem) => {
		if (newState) {
			console.log("got new state", newState);
			setState(newState);
		}
	};

	const sendMessage = (date: Date) => {
		socket.emit("update", {
			created: new Date().getTime(),
			type: "SET_DATE",
			stateKey: "myApp",
			payload: date.toISOString().slice(0, 10),
		});
	};

	useEffect(() => {
		getStateByName("myApp").then((result) => setState(result));
	}, []);

	useEffect(() => {
		socket.on("updated", handleUpdated);
	}, [socket]);

	return (
		<div className="flex">
			<div className="mx-8">
				<p>{state.props["date"]}</p>
				<Calendar
					onChange={handleDateChange}
					showWeekNumbers
					value={selectedDate}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
