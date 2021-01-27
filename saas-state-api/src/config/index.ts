import { PropertyType } from '@prisma/client';

interface HandlerConfig {
  name: string;
  handlerClz: string;
  validatorClz: string;
}

interface ActionConfig {
  name: string;
  actionType: string;
  property: string;
  propertyType: PropertyType;
  handler: HandlerConfig;
}

interface ReducerConfig {
  name: string;
  actions: ActionConfig[];
}

interface RegistryConfig {
  name: string;
  schemaClz: string;
  reducer: ReducerConfig;
}

interface AppConfig {
  registries: RegistryConfig[];
}

export const appConfig: AppConfig = {
  registries: [
    {
      name: 'myApp',
      schemaClz: 'CommonStateSchemaFactory',
      reducer: {
        name: 'common state reducer',
        actions: [
          {
            name: 'date',
            actionType: 'SET_DATE',
            property: 'date',
            propertyType: PropertyType.STRING,
            handler: {
              name: 'SimpleDateHandler',
              handlerClz: 'SimpleValueHandler',
              validatorClz: 'DateValidator',
            },
          },
          {
            name: 'todos',
            actionType: 'SET_TODOS',
            property: 'todos',
            propertyType: PropertyType.LIST,
            handler: {
              name: 'SimpleListHandler',
              handlerClz: 'ListHandler',
              validatorClz: 'StringValidator',
            },
          },
        ],
      },
    },
  ],
};
