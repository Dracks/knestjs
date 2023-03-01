import { DbChanges } from "./db-changes";

describe(DbChanges.name, ()=>{
    it('New tables', ()=>{
        const subject = new DbChanges({}, {
            table1: {
                name: 'table-1',
                className: 'original-class',
                columns: [{
                    type: 'int',
                    property: 'some-property',
                    name: 'id',
                    autoincrement: true,
                    nullable: false
                },
                {
                  type: 'char',
                  property: 'other-property',
                  name: 'name',
                  length: 250,
                  default: "john",
                  nullable: false
                }
              ],
                indexes: []
            },
            table2: {
                name: 'table-2',
                className: 'some-other-class',
                columns: [
                    {
                        type: 'int',
                        property: 'some-other-property',
                        name: 'id',
                        nullable: true,
                        default: 3,
                        unique: true
                    }
                ],
                indexes: [],
            }
        })

        expect(subject.generate()).toEqual(`
exports.up = (knex) => knex.schema.createTable("table-1", (table) => {
    table.increments("id");
    table.string("name", 250).notNullable().defaultTo("john");
})
  .createTable("table-2", (table) => {
    table.integer("id").nullable().defaultTo(3).unique();
});

exports.down = (knex) => knex.schema.dropTable("table-1")
  .dropTable("table-2");
`)
    })

    it('Add and remove fields',()=>{
        const subject = new DbChanges({
            table1: {
                name: 'table-1',
                className: 'original-class',
                columns: [{
                    type: 'int',
                    property: 'some-property',
                    name: 'id',
                    autoincrement: true,
                    nullable: false
                },
                {
                  type: 'char',
                  property: 'other-property',
                  name: 'name',
                  length: 250,
                  default: "john",
                  nullable: false
                }
              ],
                indexes: []
            },
        }, {
            table1: {
                name: 'table-1',
                className: 'original-class',
                columns: [
                    {
                        type: 'int',
                        property: 'some-property',
                        name: 'id',
                        autoincrement: true,
                        nullable: false
                    },
                    {
                        type: 'date',
                        property: 'some-other-property',
                        name: 'iding',
                        nullable: true,
                        default: "2018-01-01",
                        unique: false
                    }
                ],
                indexes: [],
            }
        })

        expect(subject.hasChanges).toBeTruthy()
        expect(subject.generate()).toEqual(`
exports.up = (knex) => knex.schema.alterTable(\"table-1\", (table) => {
    table.date("iding").nullable().defaultTo("2018-01-01");
    table.dropColumn(\"name\");
});

exports.down = (knex) => knex.schema.alterTable(\"table-1\", (table) => {
    table.string(\"name\", 250).notNullable().defaultTo(\"john\");
    table.dropColumn(\"iding\");
});
`)
    })
})
