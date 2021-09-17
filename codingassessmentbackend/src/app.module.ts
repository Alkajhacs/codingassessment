import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProblemRoutes } from 'src/app/routes/productRoute';
import { EntityModule } from 'src/app/entity.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'alka',
      database: 'Problems',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EntityModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
