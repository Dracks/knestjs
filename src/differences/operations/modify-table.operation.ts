import { TableSnapshot } from "../../migrations/snapshot.types";
import { AbstractTableOperation } from "./abstract-table.operation";
import { AddColumn } from "./add-column.operation";
import { AddIndex } from "./add-index.operation";
import { DropColumn } from "./drop-column.operation";
import { DropIndex } from "./drop-index";
import { Operation } from "./operation.type";

export class ModifyTable<B = unknown,A=unknown> extends AbstractTableOperation implements Operation {
    constructor(readonly beforeInfo: TableSnapshot<B>, readonly afterInfo: TableSnapshot<A>){super()}

    private getNewColumns(){
        const oldColumns = new Set(this.beforeInfo.columns.map(column => column.name))
        return this.afterInfo.columns
          .filter(column => !oldColumns.has(column.name))
          .map(column => AddColumn.create(column))
    }

    private getDeletedColumns(){
      const newColumns = new Set(this.afterInfo.columns.map(column => column.name))
      return this.beforeInfo.columns
        .filter(column => !newColumns.has(column.name))
        .map(column => new DropColumn(column))
    }

    private getChangedColumns(){
        // check new columns
        const newColumns = this.getNewColumns()

        // check differences in columns

        // check deleted columns
        const deletedColumns = this.getDeletedColumns()
        return [...newColumns, ...deletedColumns]
    }

    private getNewIndexes(){
        const oldIndexes = new Set(this.beforeInfo.indexes.map(idx=>idx.name))

        return this.afterInfo.indexes.filter(idx => !oldIndexes.has(idx.name))
            .map(idx => new AddIndex(idx))
    }

    private getDeletedIndexes(){
        const newIndexes = new Set(this.afterInfo.indexes.map(idx=>idx.name))

        return this.beforeInfo.indexes.filter(idx => !newIndexes.has(idx.name))
            .map(idx => new DropIndex(idx))
    }

    private getChangedIndexes(){
        // check new columns
        const newIndexes = this.getNewIndexes()

        // check differences in columns

        // check deleted columns
        const deletedIndexes = this.getDeletedIndexes()
        return [...newIndexes, ...deletedIndexes]
    }

    protected getInternalChanges(): Operation[]{
        // check the table changed the name?
        return [...this.getChangedColumns(), ...this.getChangedIndexes()]
    }

    get hasChanges():boolean{
        return this.getInternalChanges().length>0
    }

    apply(){
        return `alterTable(${JSON.stringify(this.beforeInfo.name)}, ${this.applyInternalChanges()})`
    }
}
