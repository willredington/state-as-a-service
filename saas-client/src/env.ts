export const ENV = {
	API: process.env.REACT_APP_API,
};

export const isProd = process.env.NODE_ENV.includes("prod");

export default ENV;
