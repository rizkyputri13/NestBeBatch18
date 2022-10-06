import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerModule } from './server/server.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 1999,
      username: 'postgres',
      password: 'admin',
      database: 'db',
      entities: [__dirname + '/entities/*{.ts,.js}'],
      synchronize: false,
    }),
    ServerModule,
  ],
})
export class AppModule {}
