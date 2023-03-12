import {Injectable, Inject, OnModuleInit, OnApplicationShutdown} from '@nestjs/common'
import {Knex} from 'knex'
import {promises as fs} from 'fs'
import {Constructor} from 'type-fest'
import * as path from 'path'
import {KNEST_MIGRATIONS_CONFIG, KNEST_SNAPSHOT_NAME, KNEST_TABLE_INFO, KNEST_COLUMNS_INFO, KNEX_INSTANCE} from '../constants'
import {MigrationsConfig} from '../types'
import {getTableName} from '../helpers/get-table-name'
import {ColumnInfo} from '../column.types'
import {TableSnapshot, TableConfig, IndexInfo} from '../table.types'
import {DbChanges} from '../differences/db-changes'
import { getIndexName } from '../helpers/get-index-name'

export interface Snapshot {
    knestVersion: string
    db: Record<string, TableSnapshot>
    version: number
}

// This should go into knest-models.service
const buildTableSnapshot = (model: Constructor<unknown>) : TableSnapshot => {
    const tableMetadata : TableConfig<unknown> = Reflect.getMetadata(KNEST_TABLE_INFO, model) ?? {};
    const columns : ColumnInfo[] = Reflect.getMetadata(KNEST_COLUMNS_INFO, model) ?? [];
    const indexes : IndexInfo<unknown>[] = (tableMetadata.indexes ?? []).map(idx => ({name: getIndexName(idx), columns: idx.columns}))
    return {
        name: getTableName<unknown>(model),
        className: model.name,
        columns: columns.map(column => ({name: column.property, ...column})),
        indexes: tableMetadata.indexes ?? [],
    }
}

@Injectable()
export class MigrationsService implements OnModuleInit, OnApplicationShutdown {
    private readonly models: Constructor<unknown>[] = []
    private snapshot?: Snapshot
    private snapshotFilePath: string

    constructor(
        @Inject(KNEST_MIGRATIONS_CONFIG) readonly config: MigrationsConfig,
        @Inject(KNEX_INSTANCE) readonly knex: Knex
    ){
        this.snapshotFilePath = path.join(this.config.folder, this.config.snapshotName ?? KNEST_SNAPSHOT_NAME)
    }

    async onModuleInit(){
        await fs.stat(this.config.folder).then(folderStat=>{
            if (!folderStat.isDirectory()){
                throw new Error('Migrations folder should be a directory')
            }
        }, ()=>fs.mkdir(this.config.folder, {recursive: true}))

        try {
            const file = await fs.open(this.snapshotFilePath)
            const contents = await file.readFile()
            this.snapshot = JSON.parse(contents.toString())
        } catch (error){
            console.log('Snapshot cannot be read', error.message)
        }
    }

    // Maybe I should have another service?
    async onApplicationShutdown(){
        await this.knex.destroy()
    }

    registerModels(models: Constructor<unknown>[]){
        models.forEach(model => this.models.push(model))
    }

    private async generateMigrateFile(changes: DbChanges, version: number){
        const code = `000000${version}`.substr(-7)
        await fs.writeFile(path.join(this.config.folder, `${code}-new-migration.js`), changes.generate())
    }

    async makeMigrations(){
        const currentVersion :Snapshot = this.snapshot ?? {knestVersion:'', db: {}, version: 0};
        const newTablesVersion = this.models.map(model => buildTableSnapshot(model))
        const registeredDb = newTablesVersion.reduce((ac, obj) => {
          ac[obj.name] = obj
          return ac
        }, {} as Record<string, TableSnapshot>)

        const dbChanges = new DbChanges(currentVersion.db, registeredDb)
        if (dbChanges.hasChanges){
            const newVersion : Snapshot = {
                knestVersion: "",
                db: registeredDb,
                version: currentVersion.version+1
            }
            const indent = this.config.debug ? 4 : 0
            await fs.writeFile(this.snapshotFilePath, JSON.stringify(newVersion, undefined, indent))
            await this.generateMigrateFile(dbChanges, newVersion.version)
        }
    }

    async latest(){
        await this.knex.migrate.latest()
    }
}
