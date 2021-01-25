import { ConfigFactory } from '@nestjs/config/dist/interfaces';

export type AppConfig = {
  db: {
    type: string;
    name: string;
    host: string;
    port: number;
  };
};

const configFactory: ConfigFactory<AppConfig> = () => {
  return {
    db: {
      type: process.env.DB_TYPE,
      name: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
    },
  };
};

export default configFactory;
