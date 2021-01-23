import React from "react";

type Props = {
	title?: string;
};

export const SimpleCard: React.FC<Props> = ({ title, children }) => {
	return (
		<div className="bg-gray-100 rounded p-4 font-sans text-md shadow-lg">
			{title && <p className="text-xl mb-4">{title.toUpperCase()}</p>}
			{children}
		</div>
	);
};

export default SimpleCard;
