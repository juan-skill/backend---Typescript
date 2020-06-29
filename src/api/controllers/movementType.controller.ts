import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { MovementType } from '../../models/movementType';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the MovementType
 */
export const getMovementTypes = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allMovementTypes = await storage.storage.all('MovementType');
        let allMovementType: any[] = [];


        for (const [key, value] of Object.entries(allMovementTypes)) {

            allMovementType.push(value);
        }

        return res.json(allMovementType);

    } catch (e) {
        console.error(`Error getMovementType: ${e.message}`);
    }

}


/**
 *
 * display a resource of MovementType
 */
export const getMovementTypeById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let movementType = await storage.storage.getObj('MovementType', req.params.id);
        if (!movementType) {
            return res.status(404).json({ "error": "Not Found" });
        }
        return res.json(movementType);

    } catch (e) {
        console.error(`Error getMovementTypeById: ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Driverlicenses
 */
export const deleteMovementType = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let movementType = await storage.storage.getObj('MovementType', req.params.id);
        if (!movementType) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(movementType);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteMovementType: ${e.message}`);
    }

}


/**
 *
 * create new resource in  allMovementType
 */
export const createNewMovementType = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found" });
        }

        if (!('numberMonth' in params && 'movementId' in params)) {
            return res.status(400).json({ "error": "Not Found" });
        }

        let obj = new MovementType();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewMovementType: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateMovementType = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found" });
        }

        let movementType = await storage.storage.getObj('MovementType', req.params.id);
        if (!movementType) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(movementType, requestBody);
        //console.log(driver.id);
        await storage.storage.save(movementType);

        return res.status(200).json(movementType);

    } catch (e) {
        console.error(`Error updateAMovementType: ${e.message}`);
    }
}
