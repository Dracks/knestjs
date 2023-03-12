import { IndexInfo } from "../../table.types";
import { Operation } from "./operation.type";

export class DropIndex<T=unknown> implements Operation {


    constructor(private readonly index: IndexInfo<T>){
    }

    apply(): string {
        const idxName = JSON.stringify(this.index.name ?? '')
        const columns = this.index.properties.map(columnName => JSON.stringify(columnName))
        return `dropIndex([${columns.join(',')}], ${idxName})`
    }
}
