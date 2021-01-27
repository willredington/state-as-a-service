import ENV from "env";

export async function getStateByName<T>(name: string): Promise<T> {
	return fetch(`${ENV.STATE_API}/api/state/item/${name}`).then((resp) =>
		resp.json()
	);
}
