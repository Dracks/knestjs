import { Column, Table } from "@knestjs/core";

@Table({
    name: 'user'
})
export class UserModel {
    @Column({
        type: 'int',
        autoincrement: true,
        nullable: false
    })
    id!: number

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    user!: string;
}
