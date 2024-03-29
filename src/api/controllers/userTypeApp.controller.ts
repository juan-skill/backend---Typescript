import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { UserTypeApp } from '../../models/usertype';


const sleep = util.promisify(setTimeout);


/**
 *
 * display all the usersTypes
 */
export const getUsertypeApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allUsersTypesApp = await storage.storage.all('UserTypeApp');
        let alluserType: any[] = [];

        //console.log(` list objs : ${Object.entries(allUsersTypesApp).values()}`);
        for (const [key, value] of Object.entries(allUsersTypesApp)) {
            //console.log(` key: ${kaey} \nvalue: ${value}`);
            alluserType.push(value);
        }

        return res.json(alluserType);

    } catch (e) {
        console.error(`Error getUserTypeApp: ${e.message}`);
    }

}


/**
 *
 * display a resource of UsersTypes
 */
export const getUsertypeAppById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allUsersTypesApp = await storage.storage.getObj('UserTypeApp', req.params.id);
        if (!allUsersTypesApp) {
            return res.status(404).send("Not Found");
        }
        return res.json(allUsersTypesApp);

    } catch (e) {
        console.error(`Error getUserstypeAppById: ${e.message}`);
    }

}


/**
 *
 * delete a resource of my list of UsersTypesApp
 */
export const deleteUserTypeAppById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userTypeApp = await storage.storage.getObj('UserTypeApp', req.params.id);
        if (!userTypeApp) {
            return res.status(404).send("Not Found");
        }
        await storage.storage.delete(userTypeApp);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error delteUserTypeApp: ${e.message}`);
    }

}


/**
 *
 * create new resource in usertypeApp
 */
export const createNewUserTypeApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userTypeApp = req.body;
        if (!userTypeApp) {
            return res.status(400).send("Not Found");
        }

        if (!('name' in userTypeApp)) {
            return res.status(400).send("Not Found");
        }

        let userType = new UserTypeApp();
        Object.assign(userType, userTypeApp);
        //console.log(userType.id);
        await storage.storage.new(userType);

        return res.status(201).json(userType);

    } catch (e) {
        console.error(`Error delteUserTypeApp: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateAUserTypeApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userTypeApp = req.body;
        if (!userTypeApp) {
            return res.status(400).send("Not Found");
        }

        let userTypeAp = await storage.storage.getObj('UserTypeApp', req.params.id);
        if (!userTypeApp) {
            return res.status(404).send("Not Found");
        }

        Object.assign(userTypeAp, userTypeApp);
        //console.log(userType.id);
        await storage.storage.save(userTypeAp);

        return res.status(200).json(userTypeAp);

    } catch (e) {
        console.error(`Error updateAUserTypeApp: ${e.message}`);
    }
}
