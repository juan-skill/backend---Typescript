import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { Category } from '../../models/category';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the Categorys using MotorCycleId
 */
export const getCategoryByMotorId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let motor = await storage.storage.getObj('MotorCycle', req.params.id);
        if (!motor) {
            return res.status(404).json({ "error": "Not Found" });
        }
        console.log(`${motor}`);
        let allCategorys: any[] = [];
        for (const [key, value] of Object.entries(motor.categorys)) {
            allCategorys.push(value);
        }

        return res.json(allCategorys);

    } catch (e) {
        console.error(`Error getCategoryByMotorId : \n\t${e.message}`);
    }

}


/**
 *
 * display a resource of Category
 */
export const getCategoryById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let category = await storage.storage.getObj('Category', req.params.id);
        if (!category) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(category);
        return res.json(category);

    } catch (e) {
        console.error(`Error getCategoryById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Category
 */
export const deleteCategory = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let category = await storage.storage.getObj('Category', req.params.id);
        if (!category) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(category);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteCategory: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allCategory
 */
export const createNewCategory = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        /*if (!('' in params)) {
            return res.status(400).json({ "error": "Missing payments" });
        }*/

        params['motorCycle'] = req.params.id;
        let obj = new Category();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewCategory: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateCategory = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let category = await storage.storage.getObj('Category', req.params.id);
        if (!category) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(category, requestBody);
        //console.log(driver.id);
        await storage.storage.save(category);

        return res.status(200).json(category);

    } catch (e) {
        console.error(`Error updateACategory:\n\t ${e.message}`);
    }
}
