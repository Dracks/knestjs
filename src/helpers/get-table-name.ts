import { KNEST_TABLE_INFO} from '../constants'
import {Constructor} from 'type-fest'
import {TableConfig} from '../table.types'

export const getTableName = <T>(model: Constructor<T>):string => {
    const metadata: TableConfig<T> = Reflect.getMetadata(KNEST_TABLE_INFO, model)
    const originalName = metadata?.tableName ?? model.name;

    return originalName
}
