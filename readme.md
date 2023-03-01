# Knestjs

Knestjs search to be a Nestjs ORM in which you write the models once and only once.
This is done creating migrations automatically from the models that you create.


## How to use it
1. Register the core module in your app module like so:
```TypeScript
@Module({
  imports: [
    KnestModule.forRoot({
         db: {
             client: 'sqlite3',
             connection: {
                 filename: ':memory:'
             },
             useNullAsDefault: true,
         },
         migrations: {
             folder: `${__dirname}/../../migrations`
         }
     }),
 ]
})
export class AppModule {}
```
This will configure knex with your db connection.

2. Create some model:
```TypeScript
@Table({
    tableName: 'user'
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
```

This will create a table with a column id, that is a number autoincrement, and a
column user of type varchar.

3. Register this models with `KneestModule.forFeature` at this moment this will
only register the models to be able of generate the migrations, but won't provide
any helper.
```TypeScript
KnestModule.forFeature([UserModel])
```

Now you can call to the `MigrationService.makeMigrations` to generate the migrations.
My recomendation is to use some package like nestjs-command as shown in the [example](./knestjs-sample/src/cli/cli.module.ts).
