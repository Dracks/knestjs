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

3. Register the models to your feature modules.

You can use the MigrationService to register the models, creating the TableSnapshotFactory with the module. But I recommend use a module like @knestjs/objection that uses Objection for providing the models, and also will provide you the tools to register the models easily. 


## How to handle the migrations?

### Autogenerate migrations

You need to run the method makeMigrations from the MigrationService exported in `@knestjs/core`. You can use something like nestjs-command to provide a cli application for your project, you can use that cli application to run the migrations too. 

### How to run the migrations

The migrations are configured in knextjs by knestjs. You can retrieve the knextjs instance with the constant `KNEX_INSTANCE` from nestjs, and use the migrations API of knexjs.

### Example

Take a look at the [sample project](./samples/knestjs-sample/) cli module, that uses nestjs-command to provide a cli interface for the migrations