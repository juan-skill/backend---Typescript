import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { UsersApp } from '../../models/user';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the UsersApp using UsertypeId
 */
export const getUsersAppByUserTypeId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userTypeApp = await storage.storage.getObj('UserTypeApp', req.params.id);
        if (!userTypeApp) {
            return res.status(404).json({ "error": "Not Found" });
        }

        let allUsers: any[] = [];
        for (const [key, value] of Object.entries(userTypeApp.usersApps)) {
            allUsers.push(value);
        }

        return res.json(allUsers);

    } catch (e) {
        console.error(`Error getUsersAppByUsersTypeId: ${e.message}`);
    }

}


/**
 *
 * display a resource of UsersApp
 */
export const getUsersAppById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let usersApp = await storage.storage.getObj('UsersApp', req.params.id);
        if (!usersApp) {
            return res.status(404).json({ "error": "Not Found" });
        }
        return res.json(usersApp);

    } catch (e) {
        console.error(`Error getUsersAppById: ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Driverlicenses
 */
export const deleteUsersApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let usersApp = await storage.storage.getObj('UsersApp', req.params.id);
        if (!usersApp) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(usersApp);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteUsersApp: ${e.message}`);
    }

}


/**
 *
 * create new resource in  allUsersApp
 */
export const createNewUsersApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('firstName' in params && 'numberId' in params)) {
            return res.status(400).json({ "error": "Missing name, numberId" });
        }

        params['userTypeApp'] = req.params.id;
        let obj = new UsersApp();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewUsersApp: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateUsersApp = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let usersApp = await storage.storage.getObj('UsersApp', req.params.id);
        if (!usersApp) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(usersApp, requestBody);
        //console.log(driver.id);
        await storage.storage.save(usersApp);

        return res.status(200).json(usersApp);

    } catch (e) {
        console.error(`Error updateAUsersApp: ${e.message}`);
    }
}
