import React from "react";

type Props = {
	title: string;
	count: number;
	icon?: any;
	label?: string;
};

export const MetricCard: React.FC<Props> = ({ title, count, icon, label }) => {
	return (
		<div className="bg-gray-100 rounded p-4 font-sans text-md shadow-lg">
			<div className="flex">
				<p className="flex-1 text-xl opacity-70 mr-8">
					{title.toUpperCase()}
				</p>
				{icon && <span className="text-4xl">{icon}</span>}
			</div>
			<p className="text-4xl">{count}</p>
			{label && <p className="text-md text-right opacity-50">{label}</p>}
		</div>
	);
};

export default MetricCard;
