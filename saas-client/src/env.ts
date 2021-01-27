export const ENV = {
	STATE_KEY: process.env.REACT_APP_STATE_KEY,
	STATE_API: process.env.REACT_APP_STATE_API,
	NOTIFICATION_API: process.env.REACT_APP_NOTIFICATION_API,
};

export const isProd = process.env.NODE_ENV.includes("prod");

export default ENV;
