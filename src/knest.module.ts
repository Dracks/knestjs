import {Module, Global, DynamicModule} from '@nestjs/common'
import knexConstructor from 'knex'
import {KNEX_INSTANCE, KNEST_MIGRATIONS_CONFIG, KNEST_MODELS} from './constants'
import {MigrationsService} from './services/migrations.service'
import {KnestModelsService} from './services/knest-models.service'
import {getTableProvider} from './helpers/get-table-provider'
import { KnestModuleConfig } from './types'


@Module({
    providers: [KnestModelsService]
})
class KnestFeatureModule {
    static forFeature(models: unknown[]){
        return {
            module: KnestFeatureModule,
            providers: [
                {provide: KNEST_MODELS, useValue: models},
                ...models.map(getTableProvider)
            ]
        }
    }
}

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

    static forFeature = KnestFeatureModule.forFeature
}
