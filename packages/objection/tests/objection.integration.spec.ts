import {Test, TestingModule} from '@nestjs/testing'
import {INestApplication} from '@nestjs/common'
import * as path from 'path'
import {promises as fs} from 'fs'

import {KnestObjectionModule, Repository, } from '../src'
import { UserModel } from './models/user.model'
import { GroupModel } from './models/group.model'
import { MigrationsService } from '@knestjs/core'

import 'reflect-metadata'
import { getModelKey } from '../src/get-table-provider'


const migrationsFolder = path.join(__dirname, 'migrations');
const snapshotName = 'db-status.snapshot'



describe('Integration tests of migrations', ()=>{
    let app!: INestApplication;

    describe('makemigrations', ()=>{
        beforeEach(async ()=>{
            const moduleFixture: TestingModule = await Test.createTestingModule({
                imports: [KnestObjectionModule.forRoot({
                    db: {
                        client: 'sqlite3',
                        connection: {
                            filename: ':memory:'
                        },
                        useNullAsDefault: true,
                    },
                    migrations: {
                        folder: migrationsFolder,
                        snapshotName,
                    }
                }),
                KnestObjectionModule.forFeature([UserModel, GroupModel])
            ],
            }).compile();

            app = moduleFixture.createNestApplication();

            await app.init()

            const migrationsService = app.get(MigrationsService)
            await migrationsService.makeMigrations()
            await migrationsService.latest()
        })

        afterEach(async ()=>{
            await fs.rm(migrationsFolder, {recursive: true})
            await app.close()
        })

        it('We can insert data using the Objection', async ()=>{
            const User :Repository<UserModel>= app.get(getModelKey(UserModel))

            const insertedUser = await User.query().insertAndFetch({user: 'My user', password: '1234', age: 35})

            expect(insertedUser.id).toBeTruthy()
            expect(insertedUser.created).toBeTruthy()
        })

        it('Quering multiple data', async ()=>{
            
        })
    })

})
