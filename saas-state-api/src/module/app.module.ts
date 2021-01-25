import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateRegistry } from 'src/entity/registry';
import { StateModule } from './state.module';

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
    StateModule,
  ],
})
export class AppModule {}
