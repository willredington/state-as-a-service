interface BaseEvent {
	created: number;
	payload?: any;
}

export interface StateEvent extends BaseEvent {
	type: string;
	stateKey: string;
}
