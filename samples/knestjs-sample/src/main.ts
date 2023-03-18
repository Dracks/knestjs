import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { KNEX_INSTANCE, MigrationsService} from '@knestjs/core'
import { UserModel } from './app/user/user.model';
import { Knex } from 'knex';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // migrate the database to the lates version
  await app.get(MigrationsService).latest()

  // Add some data into the database
  const knex : Knex = app.get(KNEX_INSTANCE)
  await knex<UserModel>('user').insert<UserModel>({
        user: 'John'
  })
  await knex<UserModel>('user').insert<UserModel>({
        user: 'Marta'
  })

  await app.listen(3000);
  console.log("App started!")
}
bootstrap();
