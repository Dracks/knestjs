
import {TableSnapshot} from '../table.types'
import { Change } from './change'
import {AddTable, DropTable} from './operations'
import { ModifyTable } from './operations/modify-table.operation'

export class DbChanges {
    readonly changes: Change[]

    constructor(currentVersion: Record<string, TableSnapshot>, newVersion: Record<string, TableSnapshot>){
        const newTables = this.getNewTablesChanges(currentVersion, newVersion)

        const modifiedTables = this.getModifiedTablesChanges(currentVersion, newVersion)

        const deletedTables = this.getDeletedTablesChanges(currentVersion, newVersion)

        this.changes = [...newTables, ...modifiedTables, ...deletedTables]
    }

    private getNewTablesChanges(currentVersion: Record<string, TableSnapshot>, newVersion: Record<string, TableSnapshot>): Change[]{
        const newTables = Object.keys(newVersion).filter(tableName => !currentVersion[tableName]).map(tableName => newVersion[tableName])

        return newTables.map(tableInfo =>new Change(new AddTable(tableInfo), new DropTable(tableInfo)))
    }

    private getDeletedTablesChanges(currentVersion: Record<string, TableSnapshot>, newVersion: Record<string, TableSnapshot>): Change[]{
        const deletedTables = Object.keys(currentVersion).filter(tableName => !newVersion[tableName]).map(tableName => currentVersion[tableName])

        return deletedTables.map(tableInfo =>new Change(new DropTable(tableInfo), new AddTable(tableInfo)))
    }

    private getModifiedTablesChanges(currentVersion: Record<string, TableSnapshot>, newVersion: Record<string, TableSnapshot>): Change[]{
        const modifiedTables = Object.keys(newVersion).filter(tableName => currentVersion[tableName]).map(tableName => ({newVersion: newVersion[tableName], current: currentVersion[tableName]}) )

        const changes = modifiedTables
          .map(db=> ({...db, change: new ModifyTable(db.current, db.newVersion)}))

        return changes
          .filter(({change})=>change.hasChanges)
          .map(({change, newVersion, current})=>new Change(change,new ModifyTable(newVersion, current)))
    }

    get hasChanges():boolean{
        return this.changes.length>0
    }


    generate():string {
      return `
exports.up = (knex) => knex.schema.${this.changes.map(change => change.up()).join('\n  .')};

exports.down = (knex) => knex.schema.${this.changes.map(change => change.down()).join('\n  .')};
`
    }
}
