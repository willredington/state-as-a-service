import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateRegistry } from '../entity/registry';
import { ReducerModule } from './reducer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'saas',
      entities: [StateRegistry],
      synchronize: true,
    }),
    ReducerModule,
  ],
})
export class AppModule {}
