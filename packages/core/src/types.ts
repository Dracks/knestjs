import {Knex} from 'knex'

export interface SqliteConfig {
    client: 'sqlite3' | 'better-sqlite3'
    connection: {
      filename: string
    }
    useNullAsDefault: true
}


export interface MigrationsConfig  {
    folder: string
    snapshotName?: string
    debug?: boolean
}

export interface KnestModuleConfig {
    db: SqliteConfig,
    migrations: MigrationsConfig
}

export type ModelOf<T extends object> = Knex<T>
