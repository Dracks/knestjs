import { CharColumnConfig, ColumnType, DateTimeColumnConfig, FloatColumnConfig, IntColumnConfig } from "column.types"

export interface BaseColumnSnapshot<T> {
    name: string,
    type: ColumnType,
    default?: unknown,
    nullable: boolean,
    primaryKey?: boolean
    unique?: boolean,
    property: keyof T,
}
export type IntColumnSnapshot<T> = IntColumnConfig & BaseColumnSnapshot<T>
export type FloatColumnSnapshot<T> = FloatColumnConfig & BaseColumnSnapshot<T>
export type CharColumnSnapshot<T> = CharColumnConfig & BaseColumnSnapshot<T>
export type DateTimeColumnSnapshot<T> = DateTimeColumnConfig & BaseColumnSnapshot<T>

export type ColumnSnapshot<T> = IntColumnSnapshot<T> | FloatColumnSnapshot<T> | CharColumnSnapshot<T> | DateTimeColumnSnapshot<T>

export interface IndexSnapshot {
    name: string
    columns: string[]
}

export interface TableSnapshot<T> {
    name: string,
    className: string,
    columns: ColumnSnapshot<T>[],
    indexes: IndexSnapshot[],
}

export interface Snapshot {
    knestVersion: string
    db: Record<string, TableSnapshot<unknown>>
    version: number
}
