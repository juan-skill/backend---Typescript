import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { CreditPayment } from '../../models/creditpayment';





const sleep = util.promisify(setTimeout);


/**
 *
 * display all the CreditPayments using CreditId
 */
export const getCreditPaymentByCreditId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let credit = await storage.storage.getObj('Credit', req.params.id);
        if (!credit) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${credit}`);
        let allCreditPayments: any[] = [];
        for (const [key, value] of Object.entries(credit.creditPayments)) {
            allCreditPayments.push(value);
        }

        return res.json(allCreditPayments);

    } catch (e) {
        console.error(`Error getCreditPaymentByCreditId: \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of CreditPayment
 */
export const getCreditPaymentById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let creditPay = await storage.storage.getObj('CreditPayment', req.params.id);
        if (!creditPay) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(creditPay);
        return res.json(creditPay);

    } catch (e) {
        console.error(`Error getCreditPaymentById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of CreditPayment
 */
export const deleteCreditPayment = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let creditPay = await storage.storage.getObj('CreditPayment', req.params.id);
        if (!creditPay) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(creditPay);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteCreditPayment: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allCreditPayment
 */
export const createNewCreditPayment = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('payment' in params)) {
            return res.status(400).json({ "error": "Missing payments" });
        }

        params['credit'] = req.params.id;
        let obj = new CreditPayment();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewCreditPayment: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateCreditPayment = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let creditPay = await storage.storage.getObj('CreditPayment', req.params.id);
        if (!creditPay) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(creditPay, requestBody);
        //console.log(driver.id);
        await storage.storage.save(creditPay);

        return res.status(200).json(creditPay);

    } catch (e) {
        console.error(`Error updateACreditPayment:\n\t ${e.message}`);
    }
}
