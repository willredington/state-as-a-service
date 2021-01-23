export const ENV = {
	API: process.env.REACT_APP_API,
	STATE_API: process.env.REACT_APP_STATE_API,
};

export const isProd = process.env.NODE_ENV.includes("prod");

export default ENV;
