import {Module} from '@nestjs/common'
import { CommandModule } from 'nestjs-command';
import { MigrationsCommand } from './migrations.command'
import {UserModule} from '../app/user/user.module'
import { KnestModule } from "@knestjs/core";

@Module({
  imports: [
      CommandModule,
      KnestModule.forRoot({
        db: {
            client: 'sqlite3',
            connection: {
                filename: './db.sqlite3'
            },
            useNullAsDefault: true,
        },
        migrations: {
            folder: `${__dirname}/../../migrations`
        }
    }),
      UserModule,
  ],
  providers: [MigrationsCommand]
})
export class CliModule{}
