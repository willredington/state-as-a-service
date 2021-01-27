import { useState } from "react";

type Props = {
	clickCallback: (text: string) => void;
};

export const Todos: React.FC<Props> = ({ clickCallback }) => {
	const [value, setValue] = useState("");

	return (
		<>
			<input
				name="todo"
				type="text"
				value={value}
				placeholder="enter todos here"
				onChange={(event) => setValue(event.target.value)}
			/>
			<button onClick={() => clickCallback(value)}>SEND TODO</button>
		</>
	);
};

export default Todos;
