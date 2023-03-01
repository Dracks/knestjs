import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { MigrationsService } from '@knestjs/core'

@Injectable()
export class MigrationsCommand {
  constructor(readonly migrationsService: MigrationsService) { }

  @Command({
    command: 'makemigrations',
    describe: 'create a user',
  })
  async makemigrations(
  ) {
      this.migrationsService.makeMigrations();
  }

  @Command({
    command: 'migrate',
    describe: 'Run migrations',
  })
  async migrate(
  ) {
      await this.migrationsService.latest();
  }
}
