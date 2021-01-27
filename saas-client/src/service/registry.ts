import { CreateRegistryDto } from "dto/registry";
import ENV from "env";
import { StateRegistry } from "model/registry";

export async function create<T>(
	dto: CreateRegistryDto
): Promise<StateRegistry> {
	return fetch(`${ENV.STATE_API}/api/registry/create`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((resp) => resp.json());
}
