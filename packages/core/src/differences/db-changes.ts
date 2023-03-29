
import { TableSnapshot } from '../migrations/snapshot.types'
import { Change } from './change'
import {AddTable, DropTable} from './operations'
import { ModifyTable } from './operations/modify-table.operation'

export class DbChanges<A,B> {
    readonly changes: Change[]

    constructor(private readonly currentVersion: Record<string, TableSnapshot<A>>, private readonly newVersion: Record<string, TableSnapshot<B>>){
        const newTables = this.getNewTablesChanges()

        const modifiedTables = this.getModifiedTablesChanges()

        const deletedTables = this.getDeletedTablesChanges()

        this.changes = [...newTables, ...modifiedTables, ...deletedTables]
    }

    private getNewTablesChanges(): Change[]{
        const newTables = Object.keys(this.newVersion).filter(tableName => !this.currentVersion[tableName]).map(tableName => this.newVersion[tableName])

        return newTables.map(tableInfo =>new Change(new AddTable(tableInfo), new DropTable(tableInfo)))
    }

    private getDeletedTablesChanges(): Change[]{
        const deletedTables = Object.keys(this.currentVersion).filter(tableName => !this.newVersion[tableName]).map(tableName => this.currentVersion[tableName])

        return deletedTables.map(tableInfo =>new Change(new DropTable(tableInfo), new AddTable(tableInfo)))
    }

    private getModifiedTablesChanges(): Change[]{
        const modifiedTables = Object.keys(this.newVersion).filter(tableName => this.currentVersion[tableName]).map(tableName => ({newVersion: this.newVersion[tableName], current: this.currentVersion[tableName]}) )

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
