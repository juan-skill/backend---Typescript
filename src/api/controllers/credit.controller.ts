import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { Credit } from '../../models/credit';




const sleep = util.promisify(setTimeout);


/**
 *
 * display all the Credits using UsersAppId
 */
export const getCreditByUserAppId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userApp = await storage.storage.getObj('UsersApp', req.params.id);
        if (!userApp) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${userApp}`);
        let allCredits: any[] = [];
        for (const [key, value] of Object.entries(userApp.credits)) {
            allCredits.push(value);
        }

        return res.json(allCredits);

    } catch (e) {
        console.error(`Error getUsersAppByUsersTypeId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of Credit
 */
export const getCreditById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let credit = await storage.storage.getObj('Credit', req.params.id);
        if (!credit) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(credit);
        return res.json(credit);

    } catch (e) {
        console.error(`Error getCreditById:\n\t ${e.message}`);
    }
}



/**
 *
 * delete a resource of my list of Credit
 */
export const deleteCredit = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let credit = await storage.storage.getObj('Credit', req.params.id);
        if (!credit) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(credit);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteCredit: \n${e.message}`);
    }

}


/**
 *
 * create new resource in  allCredit
 */
export const createNewCredit = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('name' in params)) {
            return res.status(400).json({ "error": "Missing name_product" });
        }

        params['usersWorker'] = req.params.id;
        let obj = new Credit();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewCredit: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateCredit = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let credit = await storage.storage.getObj('Credit', req.params.id);
        if (!credit) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(credit, requestBody);
        //console.log(driver.id);
        await storage.storage.save(credit);

        return res.status(200).json(credit);

    } catch (e) {
        console.error(`Error updateACredit: ${e.message}`);
    }
}
