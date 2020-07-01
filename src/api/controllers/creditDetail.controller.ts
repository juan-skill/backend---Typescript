import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { CreditDetail } from '../../models/credit_detail';




const sleep = util.promisify(setTimeout);


/**
 *
 * display all the CreditDetails using UsersAppId
 */
export const getCreditDetailByCreditId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let credit = await storage.storage.getObj('Credit', req.params.id);
        if (!credit) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${credit.creditsDetail}`);
        let allCreditDetails: any[] = [];
        for (const [key, value] of Object.entries(credit.creditsDetail)) {
            allCreditDetails.push(value);
        }

        return res.json(allCreditDetails);

    } catch (e) {
        console.error(`Error getCreditDetailByCreditId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of CreditDetail
 */
export const getCreditDetailById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let creditDet = await storage.storage.getObj('CreditDetail', req.params.id);
        if (!creditDet) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(creditDet);
        return res.json(creditDet);

    } catch (e) {
        console.error(`Error getCreditDetailById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of CreditDetail
 */
export const deleteCreditDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let creditDet = await storage.storage.getObj('CreditDetail', req.params.id);
        if (!creditDet) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(creditDet);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteCreditDetail: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allCreditDetail
 */
export const createNewCreditDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('payment' && 'interesRate' && 'instalments' in params)) {
            return res.status(400).json({ "error": "Missing payment, interesRate, instalments" });
        }

        params['credit'] = req.params.id;
        let obj = new CreditDetail();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewCreditDetail: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateCreditDetail = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let creditDet = await storage.storage.getObj('CreditDetail', req.params.id);
        if (!creditDet) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(creditDet, requestBody);
        //console.log(driver.id);
        await storage.storage.save(creditDet);

        return res.status(200).json(creditDet);

    } catch (e) {
        console.error(`Error updateACreditDetail:\n\t ${e.message}`);
    }
}
