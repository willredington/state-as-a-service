import SimpleCard from "component/common/Card/SimpleCard";
import useSocket from "hook/socket";
import { StateItem } from "model/state";
import React, { useEffect, useState } from "react";
import { getStateByName } from "service/state";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export const Dashboard: React.FC = () => {
	const [socket] = useSocket();

	const [selectedDate, setSelectedDate] = useState(new Date());
	const [state, setState] = useState<StateItem>({
		name: "myApp",
		props: {
			data: "",
		},
	});

	const handleDateChange = (value: Date | Date[]) => {
		console.log("value", value);
		if (value && !Array.isArray(value)) {
			setSelectedDate(value as Date);
			sendMessage();
		}
	};

	const handleUpdated = (newState: StateItem) => {
		if (newState) {
			setState(newState);
		}
	};

	useEffect(() => {
		getStateByName("myApp").then((result) => setState(result));
	}, []);

	useEffect(() => {
		socket.on("updated", handleUpdated);
	}, [socket]);

	const sendMessage = () => {
		const message = {
			created: new Date().getTime(),
			type: "SET_DATE",
			stateKey: "myApp",
			payload: selectedDate.toISOString().slice(0, 10),
		};

		console.log("sending message", message);

		socket.emit("update", message);
	};

	return (
		<div className="flex">
			<div className="mx-8">
				<p>{state.props["date"]}</p>
				<Calendar
					onChange={handleDateChange}
					showWeekNumbers
					value={selectedDate}
				/>
				<button onClick={sendMessage}>UPDATE</button>
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
