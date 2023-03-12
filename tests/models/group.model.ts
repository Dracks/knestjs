import {Table, Column} from '../../src'

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
        nullable: false
    })
    privileges?: string;

    @Column({
        type: 'datetime',
        nullable: false
    })
    created!: Date;
}
