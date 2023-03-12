import { IndexInfo } from "../../table.types";
import { Operation } from "./operation.type";

export class AddIndex<T=unknown> implements Operation {
    constructor(private readonly index: IndexInfo<T>){}

    apply(): string {
        const idxName = JSON.stringify(this.index.name ?? '')
        const columns = this.index.columns.map(columnName => JSON.stringify(columnName))
        return `index([${columns.join(',')}], ${idxName})`
    }
}
