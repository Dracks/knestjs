import {Knex} from 'knex'

export interface SqliteConfig {
    client: 'sqlite3' | 'better-sqlite3'
    connection: {
      filename: string
    }
    useNullAsDefault: true
}

interface DbWithConnection {
    version?: string
    connection: {
        host : string,
        port?: number,
        user : string
        password : string
        database : string
    }
}

export interface MySql extends DbWithConnection{
    client: 'mysql'
}

export interface PostgreSql extends Omit<DbWithConnection, 'connection'> {
    client: 'pg'
    connection: DbWithConnection['connection'] | string,
    searchPath: string[] | ['knex', 'public']
}


export interface MigrationsConfig  {
    folder: string
    snapshotName?: string
    debug?: boolean
}

export interface KnestModuleConfig {
    db: SqliteConfig | MySql | PostgreSql,
    migrations: MigrationsConfig
}

export type ModelOf<T extends object> = Knex<T>
