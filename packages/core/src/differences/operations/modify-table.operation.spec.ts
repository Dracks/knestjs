import { IndexSnapshot } from "../../migrations/snapshot.types"
import { ModifyTable } from "./modify-table.operation"

describe(ModifyTable.name, ()=>{
    const emptyTable = {className: 'pep', columns: [], indexes: [], name: 'tableName'}
    it('Add column', ()=>{
        const subject = new ModifyTable(emptyTable, {...emptyTable, columns: [{name: 'col', type: 'int', nullable: false, property: 'column'}]})

        expect(subject.hasChanges).toBeTruthy()
        expect(subject.apply()).toEqual(`alterTable("tableName", (table) => {
    table.integer("col").notNullable();
})`)
    })

    it('Drop column', ()=>{
        const subject = new ModifyTable({...emptyTable, columns: [{name: 'col', type: 'int', nullable: false, property: 'column'}]}, emptyTable)

        expect(subject.hasChanges).toBeTruthy()
        expect(subject.apply()).toEqual(`alterTable("tableName", (table) => {
    table.dropColumn("col");
})`)
    })

    it('No changes detected', ()=>{
        const subject = new ModifyTable({...emptyTable}, emptyTable)

        expect(subject.hasChanges).not.toBeTruthy()
    })

    it('Add index', ()=>{
        const idxInfo : IndexSnapshot = {name: 'idx_1', columns: ["first_name", "last_name"]}
        const subject = new ModifyTable(emptyTable, {...emptyTable, indexes: [idxInfo]})

        expect(subject.hasChanges).toBeTruthy()
        expect(subject.apply()).toEqual(`alterTable("tableName", (table) => {
    table.index(["first_name","last_name"], "idx_1");
})`)
    })

    it('Drop index', ()=>{
        const idxInfo : IndexSnapshot = {name: 'idx_1', columns: ["first_name", "last_name"]}
        const subject = new ModifyTable({...emptyTable, indexes: [idxInfo]}, emptyTable)

        expect(subject.hasChanges).toBeTruthy()
        expect(subject.apply()).toEqual(`alterTable("tableName", (table) => {
    table.dropIndex(["first_name","last_name"], "idx_1");
})`)
    })
})
