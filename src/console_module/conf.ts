import * as util from 'util';
import * as dotenv from 'dotenv';
import * as storage from '../models/conf_storage';
import { BaseModel } from '../models/base_model';
import { UsersApp } from '../models/user';
import { Capital } from '../models/capital';
import { Category } from '../models/category';
import { CreditDetail } from '../models/credit_detail';
import { CreditPayment } from '../models/creditpayment';
import { Credit } from '../models/credit';
import { DriverLicense } from '../models/driverlicense';
import { InversionDetail } from '../models/inversionDetail';
import { Inversion } from '../models/inversion';
import { MotorCycle } from '../models/moto';
import { Movement } from '../models/movement';
import { MovementType } from '../models/movementType';
import { Product } from '../models/product';
import { UserTypeApp } from '../models/usertype';
import { Withdrawal } from '../models/withdrawl';



export class Handle {

    private classCheck = [
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
    private sleep;

    public constructor() {
        dotenv.config({ path: `/home/root/new_project_v2/MysqlProject/src/.env` });
        this.sleep = util.promisify(setTimeout);
    }

    public createInstance(line: String): void {

        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (line.split(' ').length === 1) {
            console.log(`\n** class name missing **\n`);
        } else if (index !== -1) {

            let c: number = 0;
            let splitSignEqual = line;
            for (let i = 0; i < splitSignEqual.length; i++) {

                if (splitSignEqual.charAt(i) === '=') {
                    c++
                }
            }

            let classObj = this.classCheck[index].obj;
            let obj = new classObj();

            let myArray = line.split(' ', c + 2);

            for (let i = 2; i < myArray.length; i++) {

                let parameter = myArray[i];
                let validateParameter = parameter.split('=');
                let keyParameter = validateParameter[0];
                let valueParameter = validateParameter[1];
                let valueNumber: number = 0;

                if (valueParameter.includes('_')) {
                    valueParameter = valueParameter.replace(/_/g, ' ');
                    //console.log(`include _  ${valueParameter}`);
                }

                if (valueParameter.includes('"')) {
                    valueParameter = valueParameter.replace(/"|'/g, " ").trim();
                    //console.log(`include space  ${valueParameter}`);
                }

                if (!valueParameter.match(/[ ]/g)) {
                    if (valueParameter.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/igm)) {
                        valueNumber = parseFloat(valueParameter);
                        //console.log(`include .  ${valueParameter}`);

                    } else if (valueParameter.match(/$(?<=\s|^)\d+(?=\s|$)$/igm)) {
                        valueNumber = parseInt(valueParameter);
                        //console.log(`include num  ${valueParameter}`);
                    }
                }
                //console.log(`before ${valueParameter.constructor.name} and ${valueParameter}`);
                //console.log(`before ${valueNumber.constructor.name} and ${valueNumber}`);

                obj[keyParameter] = valueNumber === 0 || isNaN(valueNumber) ? valueParameter : valueNumber;
                //console.log(`after -------->       ${keyParameter} = ${obj[keyParameter]} `);
            }

            if (process.env.HBNB_TYPE_STORAGE.toString() === 'db') {
                storage.storage.save(obj);
            } else {
                //console.log(`save fileStorage`);
                obj.save();
                //storage.storage.save();

            }
            //obj.save();
            console.log(`\n${obj.id}\n`);
            //storage.storage.reload();
            //obj = eval(new `${ line.split(' ')[1] }`());

        } else {
            console.log(`\n ** class doesn't exist **\n`);
        }
    }

    public async showInstance(line: string): Promise<void> {

        console.log(`gikasdfsdf  `);
        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (line.split(' ').length === 2) {
            console.log(`\n** instance id missing **\n`)
            return;
        } else if (index === -1) {
            console.log(`\n** class doesn't exist **\n`);
            return;

        } else if (line.split(' ').length === 3) {

            let allObjs = await storage.storage.all();
            //await this.sleep(1000);

            console.log(` asldfsd    ${Object.entries(allObjs).length}`);
            //console.log(`fdsfsdf                fdfdsf           ${allObjs}`);
            let key = `${line.split(' ')[1]}.${line.split(' ')[2]}`;
            //console.log(`key: ${key}`);
            if (key in allObjs) {
                //console.log(`\n---------->  ${allObjs[key].toString()} \n`);
                console.log(`\n${allObjs[key].toString()} \n`);
            } else {
                console.log(`\n ** no instance found **\n`);
            }
        }
    }

    public async destroyInstance(line: string): Promise<void> {

        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (line.split(' ').length === 1) {
            console.log(`\n ** class name missing **\n`);
        } else if (line.split(' ').length === 2) {
            console.log(`\n ** instance id missing **\n`)
            return;
        } else if (index === -1) {
            console.log(`\n ** class doesn't exist **\n`);
            return

        } else if (line.split(' ').length === 3) {

            let allObjs = await storage.storage.all();
            let key = `${line.split(' ')[1]}.${line.split(' ')[2]}`;
            if (key in allObjs) {
                console.log('\n');
                if (process.env.HBNB_TYPE_STORAGE.toString() === 'db') {
                    storage.storage.delete(allObjs[key]);
                }
                delete allObjs[key];
                if (process.env.HBNB_TYPE_STORAGE.toString() === 'db') {
                    storage.storage.save(allObjs[key]);
                } else {
                    storage.storage.save();
                }
                //storage.storage.save();


                console.log('\n')
            } else {
                console.log(`\n** no instance found **\n`);
            }

        }
    }


    public async showSeveralInstance(line: string): Promise<void> {

        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (line.split(' ').length === 1) {

            let allObj = await storage.storage.all();
            //await this.sleep(100000);
            //console.log('hola');
            console.log(Object.entries(allObj).length);
            let allArr = [];
            for (let key in allObj) {
                allArr[allArr.length] = allObj[key].toString();
            }

            if (allArr.length !== 0) {
                console.log(`\n["${allArr}"]\n`);
            }
        } else if (line.split(' ').length === 2) {

            if (index !== -1) {

                let allObj: { [key: string]: any } = await storage.storage.all();
                //await this.sleep(10000);
                let allArr: string[] = [];
                //console.log(Object.entries(allObj).length);
                let k: string[];
                for (let key in allObj) {
                    k = key.split('.');
                    if (k[0] === line.split(' ')[1]) {
                        allArr[allArr.length] = allObj[key].toString();
                    }
                }

                if (allArr.length !== 0) {
                    console.log(`\n["${allArr}"]\n`);
                    //console.log(allArr.constructor.name);
                }
            }

        } else {
            console.log(`\n** class doesn't exist **\n`);
        }
    }

    public async updateInstance(line: string): Promise<void> {

        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (line.split(' ').length === 1) {
            console.log(`\n** class name missing **\n`);
            return;
        } else if (line.split(' ').length === 2) {
            console.log(`\n** instance id missing **\n`);
            return;

        } else if (line.split(' ').length === 3) {
            console.log(`\n** attribute name missing **\n`);
            return;

        } else if (line.split(' ').length === 4) {
            console.log(`\n** value missing **\n`);
            return;

        } else if (index === -1) {

            console.log(`\n** class doesn't exist **\n`);
            return;
        }

        // update BaseModel 1234-1234-1234 email "aibnb@holbertonschool.com"

        let attr = line.split(' ')[3];
        let val = line.split(' ')[4];

        //let vali = val.replace(/"|'/gi, " ");


        //console.log(`vali  and ${vali}    ${vali.constructor.name}`);
        //console.log(`vali  and ${parseInt(vali)}    ${parseInt(vali).constructor.name}`);

        let allObjs = await storage.storage.all();
        for (let key in allObjs) {

            let valueNumber: number = 0;
            let k = key.split('.');
            if (k[1] === line.split(' ')[2]) {

                if (val.includes('_')) {
                    val = val.replace(/_/g, ' ');
                    //console.log(`include _  ${val}`);
                }

                if (val.includes('"')) {
                    val = val.replace(/"|'/g, " ").trim();
                    //console.log(`include space  ${val}`);
                }

                if (!val.match(/[ ]/g)) {
                    if (val.match(/[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/igm)) {
                        valueNumber = parseFloat(val);
                        //console.log(`include .  ${val}`);

                    } else if (val.match(/$(?<=\s|^)\d+(?=\s|$)$/igm)) {
                        valueNumber = parseInt(val);
                        //console.log(`include num  ${val}`);
                    }
                }
                //console.log(`before ${val.constructor.name} and ${val}`);
                //console.log(`before ${valueNumber.constructor.name} and ${valueNumber}`);

                allObjs[key][attr] = valueNumber === 0 || isNaN(valueNumber) ? val : valueNumber;
                //console.log(`${allObjs[key][attr].constructor.name}`);
                //allObjs[key][attr] = (isNaN(parseInt(vali)) ? vali : parseInt(vali));
                if (process.env.HBNB_TYPE_STORAGE.toString() === 'db') {
                    storage.storage.save(allObjs[key]);
                } else {
                    storage.storage.save();
                }
                return;
            }
        }
        console.log(`\n** no instance found **\n`);
    }


    public async countInstance(line: string): Promise<void> {

        let count = 0;
        let array = line.split(' ');

        let index = this.classCheck
            .findIndex(item => { return item.name === line.split(' ')[1] });

        if (index === -1) {
            console.log(`\n** class doesn't exist **\n`);
            return;

        }

        let allObjs = await storage.storage.all();
        for (let key in allObjs) {
            let k = key.split('.');
            if (k[1] == array[1]) {
                count++;
            }
        }
        console.log(count);
    }


}
