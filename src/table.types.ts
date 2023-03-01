import {ColumnInfo} from './column.types'

export interface IndexInfo<T> {
    name: string
    fields: Array<keyof T>
}

export interface TableSnapshot {
    name: string,
    className: string,
    columns: ColumnInfo[],
    indexes: IndexInfo<unknown>[],
}


export interface TableConfig<T> {
    tableName?: string
    indexes?: Array<IndexInfo<T>>
}
