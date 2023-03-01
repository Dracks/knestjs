import {Provider} from '@nestjs/common'
import {Class} from 'type-fest'
import {Knex} from 'knex'
import {KNEX_INSTANCE, KNEST_MODEL} from '../constants'
import {getTableName} from './get-table-name'

export const getTableProvider=<T extends object>(model: Class<T> &{name: string}):Provider<any> => {
    return {
        provide: `${KNEST_MODEL}_${model.name}`,
        useFactory: (knex: Knex)=>{
            // Cannot do that, as requires the table
            // return knex(getTableName(model))
            return {}
        },
        inject: [KNEX_INSTANCE]
    }
}
