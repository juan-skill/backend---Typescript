import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { MotorCycle } from '../../models/moto';


const sleep = util.promisify(setTimeout);


/**
 *
 * display all the motorCycles
 */
export const getMotorCycles = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allMotorCycles = await storage.storage.all('MotorCycle');
        let allMotorcycl: any[] = [];

        //console.log(` list objs : ${Object.entries(allMotorCycles).values()}`);
        for (const [key, value] of Object.entries(allMotorCycles)) {
            //console.log(` key: ${kaey} \nvalue: ${value}`);
            allMotorcycl.push(value);
        }

        return res.json(allMotorcycl);

    } catch (e) {
        console.error(`Error getUserTypeApp: ${e.message}`);
    }
}


/**
 *
 * display a resource of Motorcycles
 */
export const getMotoById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allMotorCycles = await storage.storage.getObj('MotorCycle', req.params.id);
        if (!allMotorCycles) {
            return res.status(404).send("Not Found");
        }
        return res.json(allMotorCycles);

    } catch (e) {
        console.error(`Error getMotorCycle: ${e.message}`);
    }

}


/**
 *
 * delete a resource of my list of Motorcycles
 */
export const deleteMotorById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let motorCycle = await storage.storage.getObj('MotorCycle', req.params.id);
        if (!motorCycle) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(motorCycle);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error delteMotorCycle: ${e.message}`);
    }
}


/**
 *
 * create new resource in motorCycles
 */
export const createNewMotorcycle = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let motorCycle_data = req.body;
        if (!motorCycle_data) {
            return res.status(400).send("Not Found");
        }

        if (!('reference' in motorCycle_data)) {
            return res.status(400).send("Not Found");
        }

        let motor = new MotorCycle();
        Object.assign(motor, motorCycle_data);
        //console.log(userType.id);
        await storage.storage.new(motor);

        return res.status(201).json(motor);

    } catch (e) {
        console.error(`Error createNewMotor: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateAMotor = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let motorCycle = req.body;
        if (!motorCycle) {
            return res.status(400).send("Not Found");
        }

        let motorCycl = await storage.storage.getObj('MotorCycle', req.params.id);
        if (!motorCycl) {
            return res.status(404).send("Not Found");
        }

        Object.assign(motorCycl, motorCycle);
        //console.log(userType.id);
        await storage.storage.save(motorCycl);

        return res.status(200).json(motorCycl);

    } catch (e) {
        console.error(`Error updateAUserTypeApp: ${e.message}`);
    }
}
