import {Table, Column} from '@knestjs/core'

@Table<GroupModel>({
    indexes: [{properties: ['privileges']}]
})
export class GroupModel {

    @Column({
        type: 'int',
        nullable: false,
        primaryKey: true,
        autoincrement: true
    })
    id!: number

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    name!: string;

    @Column({
        type: 'char',
        length: 51,
        nullable: false,
        name: 'role'
    })
    privileges?: string;

    @Column({
        type: 'datetime',
        nullable: false
    })
    created!: Date;
}
