import * as util from 'util';
import * as storage from '../../models/conf_storage';
import { UsersApp } from '../../models/user';
import { UserTypeApp } from '../../models/usertype';
import { Response, Request } from 'express';


const sleep = util.promisify(setTimeout);

let _classes = [
    { 'name': 'UsersApp', 'obj': UsersApp, 'db': 'users_app' },
    { 'name': 'UserTypeApp', 'obj': UserTypeApp, 'db': 'user_type_app' }
];


/**
 *
 * Show the quantity of objects classified by class
 *
 */
export const showStatus = async (req: Request, res: Response): Promise<Response> => {
    return res.json({ "status": "OK" });
}


/**
 *
 * Show the quantity of objects classified by class
 */
export const showStats = async (req: Request, res: Response): Promise<Response> => {

    let totales: { [key: string]: any } = {};

    try {
        await sleep(5);
        //    throw new Error('Error showStats: ');
        for (let key in _classes) {
            totales[_classes[key].name] = (await storage.storage.count(_classes[key].name));
        }
        //console.log(JSON.stringify(totales));
        return res.json(totales);

    } catch (e) {
        console.error(`Error showStats: ${e.message}`);
    }

}