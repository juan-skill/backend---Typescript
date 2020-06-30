import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { Withdrawal } from '../../models/withdrawl';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the Withdrawals using InversionId
 */
export const getWithdrawalByInversionId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let inversion = await storage.storage.getObj('Inversion', req.params.id);
        if (!inversion) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${inversion.inversionDetail}`);
        let allWithdrawals: any[] = [];
        for (const [key, value] of Object.entries(inversion.withdraws)) {
            allWithdrawals.push(value);
        }

        return res.json(allWithdrawals);

    } catch (e) {
        console.error(`Error getWithdrawalByInversionId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of Withdrawal
 */
export const getWithdrawalById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let withdraw = await storage.storage.getObj('Withdrawal', req.params.id);
        if (!withdraw) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(withdraw);
        return res.json(withdraw);

    } catch (e) {
        console.error(`Error getWithdrawalById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Withdrawal
 */
export const deleteWithdrawal = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let withdraw = await storage.storage.getObj('Withdrawal', req.params.id);
        if (!withdraw) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(withdraw);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteWithdrawal: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allWithdrawal
 */
export const createNewWithdrawal = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('withdrawFunds' in params)) {
            return res.status(400).json({ "error": "Missing withdrawaFunds" });
        }

        params['inversion'] = req.params.id;
        let obj = new Withdrawal();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewWithdrawal: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateWithdrawal = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let withdraw = await storage.storage.getObj('Withdrawal', req.params.id);
        if (!withdraw) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(withdraw, requestBody);
        //console.log(driver.id);
        await storage.storage.save(withdraw);

        return res.status(200).json(withdraw);

    } catch (e) {
        console.error(`Error updateAWithdrawal:\n\t ${e.message}`);
    }
}
