import "reflect-metadata";
import { Connection, ConnectionManager, Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { BaseModel } from '../base_model';
import { UsersApp } from '../user';
import { UserTypeApp } from '../usertype';
import { MotorCycle } from '../moto';
import { DriverLicense } from '../driverlicense';
import { MovementType } from "../movementType";
/*
import { Capital } from '../capital';
import { Category } from '../category';
import { CreditDetail } from '../credit_detail';
import { CreditPayment } from '../creditpayment';
import { Credit } from '../credit';

import { InversionDetail } from '../inversionDetail';
import { Inversion } from '../inversion';

import { Movement } from '../movement';

import { Product } from '../product';
import { Withdrawal } from '../withdrawl';

import { Connection } from "typeorm";
import { createConnection } from 'net';
*/


export class DBStorage {

    private _engine: Connection = null;

    private _classes = [
        { 'name': 'UsersApp', 'obj': UsersApp, 'db': 'users_app' },
        { 'name': 'UserTypeApp', 'obj': UserTypeApp, 'db': 'user_type_app' },
        { 'name': 'MotorCycle', 'obj': MotorCycle, 'db': 'motor_cycle' },
        { 'name': 'DriverLicense', 'obj': DriverLicense, 'db': 'driver_license' },
        { 'name': 'MovementType', 'obj': MovementType, 'db': 'movement_type' }
        /*{ 'name': 'Capital', 'obj': Capital },
        { 'name': 'Category', 'obj': Category },
        { 'name': 'CreditDetail', 'obj': CreditDetail },
        { 'name': 'CreditPayment', 'obj': CreditPayment },
        { 'name': 'Credit', 'obj': Credit },

        { 'name': 'InversionDetail', 'obj': InversionDetail },
        { 'name': 'Inversion', 'obj': Inversion },

        { 'name': 'Movement', 'obj': Movement },

        { 'name': 'Product', 'obj': Product },
        { 'name': 'Withdrawal', 'obj': Withdrawal }*/
    ];

    constructor() {
        dotenv.config({
            path: '/home/root/new_project_v2/MysqlProject/src/.env'
        });
        //console.log(process.env.HBNB_MYSQL_USER);

        const connectionManager = new ConnectionManager();
        this._engine = connectionManager.create({

            type: "mysql",
            host: process.env.HBNB_MYSQL_PORT,
            port: parseInt(process.env.HBNB_PORT),
            username: process.env.HBNB_MYSQL_USER,
            password: process.env.HBNB_MYSQL_PWD,
            database: process.env.HBNB_MYSQL_DB,
            entities: ["build/entity/**/*.js"],
            synchronize: true,
            logging: false
        });



    }

    public async all(cls?: any): Promise<{ [key: string]: any }> {

        let objCopy: { [key: string]: any } = {};

        if (cls) {
            let index = this._classes.findIndex((item) => { return item.name === cls; });
            let obj = new this._classes[index].obj;
            const repository: Repository<typeof obj> = this._engine.getRepository(this._classes[index].db);
            let instance = await repository.find();

            for (let j in instance) {
                let key = `${instance[j].constructor.name}.${instance[j].id}`;
                objCopy[key] = new this._classes[index].obj(instance[j]);
            }
            //console.log(`${cls}  length ${Object.entries(objCopy).length}`);
            return (objCopy);
        }

        for (let i in this._classes) {

            let obj = new this._classes[i].obj;
            const repository: Repository<typeof obj> = this._engine.getRepository(this._classes[i].db);
            let instance = await repository.find();

            for (let j in instance) {

                let key = `${instance[j].constructor.name}.${instance[j].id}`;

                objCopy[key] = new this._classes[i].obj(instance[j]);
            }

        }
        //console.log(`list objs all method  ${Object.entries(objCopy).length}`);
        return (objCopy);

    }

    public async new(baseModel: any): Promise<void> {

        try {
            let index = this._classes.findIndex((item) => {
                return item.name === baseModel.constructor.name;
            });

            const repository: Repository<typeof baseModel> = this._engine.getRepository(this._classes[index].db);
            await repository.save(baseModel);

        } catch (e) {
            console.error(`\n\nError inserting db: \n\t${e} \n\t${e.message} `);
        }
    }

    public async save(baseModel?: BaseModel): Promise<void> {

        try {

            let index = this._classes.findIndex((item) => {
                return item.name === baseModel.constructor.name;
            });

            const repository: Repository<typeof baseModel> = this._engine.getRepository(this._classes[index].db);
            await repository.save(baseModel);

        } catch (e) {
            console.error(`\n\nError saving db: \n\t${e} \n\t${e.message} `);
        }

    }

    public async delete(baseModel: any): Promise<void> {

        try {
            let index = this._classes.findIndex((item) => {
                return item.name === baseModel.constructor.name;
            });
            const repository: Repository<typeof baseModel> = this._engine.getRepository(this._classes[index].db);
            await repository.delete(baseModel.id);

        } catch (e) {
            console.error(`\n\nError deleting db: \n\t${e} \n\t${e.message} `);
        }

    }

    public async reload(): Promise<void> {

        try {
            await this._engine.connect();
            console.log(`\nstatus connection db: ${this._engine.isConnected} `);
        } catch (e) {
            console.error(`\n\nError connection db: \n\t${e} \n\t${e.message} `);
        }
    }

    public async closeSession(): Promise<void> {
        try {
            await this._engine.close();
            console.log(`\nclose session db: ${this._engine.isConnected} `);
        } catch (e) {
            console.error(`\n\nError connection db: \n\t${e} \n\t${e.message} `);
        }
    }

    /**
     * retrieves one object based on class name and id
     */
    public async getObj(cls?: string, id?: string): Promise<any> {
        if (cls && id) {
            let fetch_obj = `${cls}.${id}`;
            let allObj = await this.all(cls);
            if (fetch_obj in allObj) {
                return (allObj[fetch_obj])
            }
        }
        return null;
    }

    /**
     * count of all objects in storage
     */
    public async count(cls?: string): Promise<number> {
        return (Object.entries(await this.all(cls)).length);
    }

}
