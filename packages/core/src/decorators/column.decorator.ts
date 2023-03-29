import {KNEST_COLUMNS_INFO} from '../constants'
import { CharColumnConfig, ColumnType, DateTimeColumnConfig, FloatColumnConfig, IntColumnConfig } from '../column.types'


interface BaseColumnArg {
    name?: string,
    type: ColumnType,
    default?: unknown,
    nullable: boolean,
    primaryKey?: boolean
    unique?: boolean
}

export type IntColumnArg = IntColumnConfig & BaseColumnArg
export type FloatColumnArg = FloatColumnConfig & BaseColumnArg
export type CharColumnArg = CharColumnConfig & BaseColumnArg
export type DateTimeColumnArg= DateTimeColumnConfig & BaseColumnArg

export type ColumnArg = IntColumnArg | FloatColumnArg | CharColumnArg | DateTimeColumnArg

export type ColumnInfo<T> = ColumnArg & {
    property: keyof T
}


export const Column = (config: ColumnArg) => (target: object, property: string)=>{
    const columns : ColumnInfo<unknown>[] = Reflect.getMetadata(KNEST_COLUMNS_INFO, target.constructor) ?? [];
    if (columns.findIndex((p: ColumnInfo<unknown>) => p.property === property)>=0){
        throw new Error(`A property cannot be decorated two times, check ${(target as {name: string}).name}.${property}`)
    }
    columns.push({
        ...config,
        property
    } as ColumnInfo<unknown>)
    Reflect.defineMetadata(KNEST_COLUMNS_INFO, columns, target.constructor)
}

export const ColumnNullable = <T extends ColumnArg>(config: Omit<T, 'nullable' | 'primaryKey'>) => Column({...config, nullable: true} as T)
export const ColumnNotNull = <T extends ColumnArg>(config: Omit<T, 'nullable'>) => Column({...config, nullable: false} as T)
