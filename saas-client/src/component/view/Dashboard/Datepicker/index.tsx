import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Props = {
	dateCallback: (value: Date) => void;
};

export const Datepicker: React.FC<Props> = ({ dateCallback }) => {
	const [date, setDate] = useState(new Date());

	const handleDateChange = (value: Date | Date[]) => {
		if (value && !Array.isArray(value)) {
			setDate(value as Date);
			dateCallback(value);
		}
	};

	return (
		<Calendar onChange={handleDateChange} showWeekNumbers value={date} />
	);
};

export default Datepicker;
