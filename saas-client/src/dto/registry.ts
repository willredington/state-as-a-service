export type CreateActionDto = {
	name: string;
	actionType: string;
	validatorKey: string;
};

export type CreateRegistryDto = {
	stateKey: string;
	reducerKey: string;
	actions: CreateActionDto[];
};
