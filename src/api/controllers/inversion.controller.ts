import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { Inversion } from '../../models/inversion';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the Inversions using UsersAppId
 */
export const getInversionByUserAppId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let userApp = await storage.storage.getObj('UsersApp', req.params.id);
        if (!userApp) {
            return res.status(404).json({ "error": "Not Found" });
        }
        console.log(`${userApp}`);
        let allInversions: any[] = [];
        for (const [key, value] of Object.entries(userApp.inversions)) {
            allInversions.push(value);
        }

        return res.json(allInversions);

    } catch (e) {
        console.error(`Error getUsersAppByUsersTypeId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of Inversion
 */
export const getInversionById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversion = await storage.storage.getObj('Inversion', req.params.id);
        if (!inversion) {
            return res.status(404).json({ "error": "Not Found" });
        }
        console.log(inversion);
        return res.json(inversion);

    } catch (e) {
        console.error(`Error getInversionById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Inversion
 */
export const deleteInversion = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversion = await storage.storage.getObj('Inversion', req.params.id);
        if (!inversion) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(inversion);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteInversion: \n${e.message}`);
    }

}


/**
 *
 * create new resource in  allInversion
 */
export const createNewInversion = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('payment' in params)) {
            return res.status(400).json({ "error": "Missing payment" });
        }

        params['usersInvestor'] = req.params.id;
        let obj = new Inversion();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewInversion: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateInversion = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let inversion = await storage.storage.getObj('Inversion', req.params.id);
        if (!inversion) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(inversion, requestBody);
        //console.log(driver.id);
        await storage.storage.save(inversion);

        return res.status(200).json(inversion);

    } catch (e) {
        console.error(`Error updateAInversion: ${e.message}`);
    }
}
