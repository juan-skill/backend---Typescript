import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { DriverLicense } from '../../models/driverlicense';


const sleep = util.promisify(setTimeout);


/**
 *
 * display all the DriverLicense
 */
export const getDriverLicense = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allDriverLicense = await storage.storage.all('DriverLicense');
        let allDriverLince: any[] = [];

        //console.log(` list objs : ${Object.entries(allDriverLicense).values()}`);
        for (const [key, value] of Object.entries(allDriverLicense)) {
            //console.log(` key: ${kaey} \nvalue: ${value}`);
            allDriverLince.push(value);
        }

        return res.json(allDriverLince);

    } catch (e) {
        console.error(`Error getDriverLicense: ${e.message}`);
    }

}


/**
 *
 * display a resource of DriverLicense
 */
export const getDriverLicenseById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let allDriverLicense = await storage.storage.getObj('DriverLicense', req.params.id);
        if (!allDriverLicense) {
            return res.status(404).json({ "error": "Not Found" });
        }
        return res.json(allDriverLicense);

    } catch (e) {
        console.error(`Error getDriverLicenseById: ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Driverlicenses
 */
export const deleteDriverLicense = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let driverLicense = await storage.storage.getObj('DriverLicense', req.params.id);
        if (!driverLicense) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(driverLicense);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteDriverLicense: ${e.message}`);
    }

}


/**
 *
 * create new resource in  driverLicense
 */
export const createNewDriverLicense = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let driverLicense = req.body;
        if (!driverLicense) {
            return res.status(400).json({ "error": "Not Found" });
        }

        if (!('authorized_categories' in driverLicense)) {
            return res.status(400).json({ "error": "Not Found" });
        }

        let driver = new DriverLicense();
        Object.assign(driver, driverLicense);
        //console.log(driver.id);
        await storage.storage.new(driver);

        return res.status(201).json(driver);

    } catch (e) {
        console.error(`Error createNewDriverLicense: ${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateDriverLicense = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let driverLicense = req.body;
        if (!driverLicense) {
            return res.status(400).json({ "error": "Not Found" });
        }

        let driver = await storage.storage.getObj('DriverLicense', req.params.id);
        if (!driverLicense) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(driver, driverLicense);
        //console.log(driver.id);
        await storage.storage.save(driver);

        return res.status(200).json(driver);

    } catch (e) {
        console.error(`Error updateADriverLicense: ${e.message}`);
    }
}
