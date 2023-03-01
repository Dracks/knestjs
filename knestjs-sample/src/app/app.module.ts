import { Module } from '@nestjs/common';
import {KnestModule} from '@knestjs/core'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    KnestModule.forRoot({
         db: {
             client: 'sqlite3',
             connection: {
                 filename: ':memory:'
             },
             useNullAsDefault: true,
         },
         migrations: {
             folder: `${__dirname}/../../migrations`
         }
     }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
