import ENV from "env";
import { StateItem } from "model/state";

export async function getStateByName(name: string): Promise<StateItem> {
	return fetch(`${ENV.STATE_API}/api/state/item/${name}`).then((resp) =>
		resp.json()
	);
}
