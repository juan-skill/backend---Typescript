import * as fs from 'fs';
import { BaseModel } from '../base_model';
import { UsersApp } from '../user';
import { Capital } from '../capital';
import { Category } from '../category';
import { CreditDetail } from '../credit_detail';
import { CreditPayment } from '../creditpayment';
import { Credit } from '../credit';
import { DriverLicense } from '../driverlicense';
import { InversionDetail } from '../inversionDetail';
import { Inversion } from '../inversion';
import { MotorCycle } from '../moto';
import { Movement } from '../movement';
import { MovementType } from '../movementType';
import { Product } from '../product';
import { UserTypeApp } from '../usertype';
import { Withdrawal } from '../withdrawl';



export class FileStorage {

    private _filePath: string = './src/file.json';
    private _listObjects: { [key: string]: BaseModel } = {};

    constructor() {

    }

    public all(cls?: any): { [key: string]: BaseModel } {
        //console.log('I am here fileStorage: all()');
        if (cls) {
            let objCopy: { [key: string]: any } = {};
            //console.log(`cls ${cls}  is ${cls.constructor.name}`);
            for (let key in this._listObjects) {
                let k = key.split('.');
                if (k[0] === cls) {
                    objCopy[key] = this._listObjects[key];
                    console.log(`  listo   ${objCopy}`);
                }
            }
            return (objCopy);
        }

        return (this._listObjects);
    }

    public new(baseModel: any): void {
        //console.log('I am here fileStorage: new(baseModel)');
        let key = `${baseModel.constructor.name}.${baseModel.id}`;
        this._listObjects[key] = baseModel;
    }

    public save(baseModel?: any): void {
        //console.log('I am here fileStorage: save()');
        let javaScriptObj: { [key: string]: any } = {};

        for (let key in this._listObjects) {
            javaScriptObj[key] = this._listObjects[key].toDict();
            //this.toViewObject(javaScriptObj[key]);
        }

        try {
            fs.writeFileSync(this._filePath, JSON.stringify(javaScriptObj), { encoding: 'utf8' });
        } catch (e) {
            console.log(`${e.message} `);
        } finally {
            console.log('done sync write');
        }
    }

    public delete(baseModel: any): void {

        if (baseModel !== null) {
            let key = `${baseModel.constructor.name}.${baseModel.id}`;
            if (key in this._listObjects) {
                delete this._listObjects[key];
            }
        }
    }

    public reload(): void {
        let stringJson;
        //console.log('I am in here: reload filestorage');

        let className = [
            { 'name': 'BaseModel', 'obj': BaseModel },
            { 'name': 'UsersApp', 'obj': UsersApp },
            { 'name': 'Capital', 'obj': Capital },
            { 'name': 'Category', 'obj': Category },
            { 'name': 'CreditDetail', 'obj': CreditDetail },
            { 'name': 'CreditPayment', 'obj': CreditPayment },
            { 'name': 'Credit', 'obj': Credit },
            { 'name': 'DriverLicense', 'obj': DriverLicense },
            { 'name': 'InversionDetail', 'obj': InversionDetail },
            { 'name': 'Inversion', 'obj': Inversion },
            { 'name': 'MotorCycle', 'obj': MotorCycle },
            { 'name': 'Movement', 'obj': Movement },
            { 'name': 'MovementType', 'obj': MovementType },
            { 'name': 'Product', 'obj': Product },
            { 'name': 'UserTypeApp', 'obj': UserTypeApp },
            { 'name': 'Withdrawal', 'obj': Withdrawal },
        ];

        try {
            let data = fs.readFileSync(this._filePath, { encoding: 'utf8' });
            //console.log(`-->  ${data}  ${data.constructor.name}`);
            stringJson = JSON.parse(data);
            //console.log(`-->  ${stringJson}  ${stringJson.constructor.name}`);
            let index;
            let classObj;
            for (let k in stringJson) {
                let objClass = stringJson[k]['__class__'];
                index = className.findIndex((item) => {
                    return item.name === objClass;
                });
                classObj = className[index].obj;
                //console.log(className[index].obj.constructor.name);
                //para obtener Base como funcion accedemos al arreglo array[index].key     nos regresara el valor para esa clave del elemento del array
                //console.log(classN.constructor.name);
                this._listObjects[k] = new classObj(stringJson[k]);
                //console.log(` guardado ${this._listObjects[k].toString()}   \nlenght: ${Object.entries(this._listObjects).length}`);
                //`new ${objClass} (${stringJson[k]})`
            }
        } catch (e) {
            console.log(e.message);
        } finally {
            console.log('done sync read');
        }

    }

    toViewObject(stringJson: { [key: string]: any }): void {

        //console.log("JSON of stringJson(type Object: how to print a Object in javascript):");
        //console.log('hole');
        for (let key in stringJson) {
            //console.log(`\t ${key}: (${typeof stringJson[key]}) - ${stringJson[key]} `);
            for (let k in stringJson[key]) {
                //console.log(`\t ${k}: (${typeof stringJson[k]}) - ${stringJson[k]} `);
            }
        }
    }


    public closeSession() {
    }

    /**
     * retrieves one object based on class name and id
     */
    public getObj(cls?: string, id?: string): any {
        if (cls && id) {
            let fetch_obj = `${cls}.${id}`;
            let allObj = this.all(cls);
            if (fetch_obj in allObj) {
                return (allObj[fetch_obj])
            }
        }
        return null;
    }

    /**
     * count of all objects in storage
     */
    public count(cls?: string): number {
        return (Object.entries(this.all(cls)).length);

    }
}
