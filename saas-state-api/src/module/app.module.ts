import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionItem } from 'src/entity/action';
import { StateRegistryItem } from 'src/entity/registry';
import { SchemaModule } from 'src/graphql/schema.module';
import { StateModule } from './state.module';

@Module({
  imports: [
    SchemaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'saas',
      entities: [StateRegistryItem, ActionItem],
      synchronize: true,
    }),
    GraphQLModule.forRoot({
      playground: true,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
    }),
    StateModule,
  ],
})
export class AppModule {}
