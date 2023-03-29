import {Module, Global, DynamicModule} from '@nestjs/common'
import knexConstructor from 'knex'
import {KNEX_INSTANCE, KNEST_MIGRATIONS_CONFIG} from './constants'
import {MigrationsService} from './migrations/migrations.service'
import { KnestModuleConfig } from './types'

@Module({
    providers: [MigrationsService],
    exports: [MigrationsService],
})
@Global()
export class KnestModule {
    static forRoot(config: KnestModuleConfig): DynamicModule{
        return {
            module: KnestModule,
            providers: [
                {provide: KNEX_INSTANCE, useValue: knexConstructor({...config.db, migrations: {directory: config.migrations.folder}})},
                {provide: KNEST_MIGRATIONS_CONFIG, useValue: config.migrations},
            ],
            exports: [KNEX_INSTANCE]
        }
    }
}
