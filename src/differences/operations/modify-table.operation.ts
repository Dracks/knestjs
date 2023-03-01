import { TableSnapshot } from "../../table.types";
import { AbstractTableOperation } from "./abstract-table.operation";
import { AddColumn } from "./add-column.operation";
import { DropColumn } from "./drop-column.operation";
import { Operation } from "./operation.type";

export class ModifyTable extends AbstractTableOperation implements Operation {
    constructor(readonly beforeInfo: TableSnapshot, readonly afterInfo: TableSnapshot){super()}

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

    private getChangedIndexes(){
        // check new columns

        // check differences in columns

        // check deleted columns
        return []
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
