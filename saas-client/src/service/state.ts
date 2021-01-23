import ENV from "env";
import { AppState } from "model/state";

export async function getStateByName(
	name: string
): Promise<Record<"props", AppState>> {
	return fetch(`${ENV.API}/api/state/list/${name}`).then((resp) =>
		resp.json()
	);
}
