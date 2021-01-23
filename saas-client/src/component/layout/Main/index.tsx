import Dashboard from "component/view/Dashboard";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Main: React.FC = () => (
	<div className="h-screen bg-gray-200">
		<div className="pt-4">
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Dashboard} />
				</Switch>
			</BrowserRouter>
		</div>
	</div>
);

export default Main;
