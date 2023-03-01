import {Table, Column} from '../../'

@Table<UserModel>({
  indexes: [{fields: ['user'], name:'user_idx'}]
})
export class UserModel {

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
    user!: string;

    @Column({
        type: 'char',
        length: 51,
        nullable: true
    })
    password?: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    age?: number;

    @Column({
        type: 'datetime',
        nullable: false
    })
    created!: Date;
}
