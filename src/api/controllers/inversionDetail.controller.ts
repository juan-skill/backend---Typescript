import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { InversionDetail } from '../../models/inversionDetail';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the InversionDetails using UsersAppId
 */
export const getInversionDetailByInversionId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversion = await storage.storage.getObj('Inversion', req.params.id);
        if (!inversion) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${inversion.inversionDetail}`);
        let allInversionDetails: any[] = [];
        for (const [key, value] of Object.entries(inversion.inversionDetail)) {
            allInversionDetails.push(value);
        }

        return res.json(allInversionDetails);

    } catch (e) {
        console.error(`Error getInversionDetailByInversionId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of InversionDetail
 */
export const getInversionDetailById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversionDet = await storage.storage.getObj('InversionDetail', req.params.id);
        if (!inversionDet) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(inversionDet);
        return res.json(inversionDet);

    } catch (e) {
        console.error(`Error getInversionDetailById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of InversionDetail
 */
export const deleteInversionDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversionDet = await storage.storage.getObj('InversionDetail', req.params.id);
        if (!inversionDet) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(inversionDet);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteInversionDetail: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allInversionDetail
 */
export const createNewInversionDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('interesRate' && 'numberMonth' in params)) {
            return res.status(400).json({ "error": "Missing payment, numberMonth" });
        }

        params['inversion'] = req.params.id;
        let obj = new InversionDetail();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewInversionDetail: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateInversionDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let inversionDet = await storage.storage.getObj('InversionDetail', req.params.id);
        if (!inversionDet) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(inversionDet, requestBody);
        //console.log(driver.id);
        await storage.storage.save(inversionDet);

        return res.status(200).json(inversionDet);

    } catch (e) {
        console.error(`Error updateAInversionDetail:\n\t ${e.message}`);
    }
}
