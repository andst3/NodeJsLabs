import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {MongooseModule} from "@nestjs/mongoose";

import {TasksModule} from "./tasks/tasks.module";

@Module({
  imports: [
      MongooseModule.forRoot(
          'mongodb+srv://Andrey:1@mongotestnodejs-4xtmt.azure.mongodb.net/task-manager?retryWrites=true&w=majority'
      ),
      TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
