import { KNEST_TABLE_INFO, KNEST_COLUMNS_INFO} from '../constants'
import { Constructor } from 'type-fest';


export interface IndexInfo<T> {
    name?: string
    properties: Array<keyof T>
}

export interface TableArg<T> {
    name?: string
    indexes?: Array<IndexInfo<T>>
}

export type ClassDecorator<T> = <TCtor extends Constructor<T>>(target: TCtor) => TCtor

export const Table = <T>(config?: TableArg<T>):ClassDecorator<T> =>  (target) => {
    Reflect.defineMetadata(KNEST_TABLE_INFO, config, target)
    return target
}
