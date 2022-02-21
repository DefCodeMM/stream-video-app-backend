import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './module/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mongodb:27017/${process.env.MONGO_TABLE_NAME}`,
    ),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
