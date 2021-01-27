import { ENV } from "env";
import useSocket from "hook/socket";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CommonState } from "saas-common";
import { getStateByName } from "service/state";

export const Dashboard: React.FC = () => {
	const [socket] = useSocket();
	const [date, setDate] = useState(new Date());
	const [state, setState] = useState<CommonState>();

	const handleDateChange = (value: Date | Date[]) => {
		if (value && !Array.isArray(value)) {
			setDate(value as Date);
		}
	};

	const handleUpdated = (newState: CommonState) => {
		if (newState) {
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
		getStateByName<CommonState>(ENV.STATE_KEY).then((result) =>
			setState(result)
		);
	}, []);

	useEffect(() => {
		socket.on("updated", handleUpdated);
	}, [socket]);

	return (
		<div className="flex">
			<div className="mx-8">
				<p>State Date {state?.date}</p>
				<Calendar
					onChange={handleDateChange}
					showWeekNumbers
					value={date}
				/>
				<button onClick={() => sendMessage(date)}>SEND</button>
			</div>
		</div>
	);
};

export default Dashboard;
