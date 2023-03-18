import { IndexSnapshot } from "../../migrations/snapshot.types";
import { Operation } from "./operation.type";

export class AddIndex implements Operation {
    constructor(private readonly index: IndexSnapshot){}

    apply(): string {
        const idxName = JSON.stringify(this.index.name)
        const columns = this.index.columns.map(columnName => JSON.stringify(columnName))
        return `index([${columns.join(',')}], ${idxName})`
    }
}
