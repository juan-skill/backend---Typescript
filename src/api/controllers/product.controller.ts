import * as util from 'util';
import { Request, Response } from 'express';
import * as storage from '../../models/conf_storage';
import { Product } from '../../models/product';



const sleep = util.promisify(setTimeout);


/**
 *
 * display all the Products using CategoryId
 */
export const getProductByCategoryId = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let category = await storage.storage.getObj('Category', req.params.id);
        if (!category) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(`${category}`);
        let allProducts: any[] = [];
        for (const [key, value] of Object.entries(category.products)) {
            allProducts.push(value);
        }

        return res.json(allProducts);

    } catch (e) {
        console.error(`Error getProductByCategoryId: \n\t${e.message}`);
    }
}


/**
 *
 * display a resource of Product
 */
export const getProductById = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let product = await storage.storage.getObj('Product', req.params.id);
        if (!product) {
            return res.status(404).json({ "error": "Not Found" });
        }
        //console.log(product);
        return res.json(product);

    } catch (e) {
        console.error(`Error getProductById:\n\t ${e.message}`);
    }

}



/**
 *
 * delete a resource of my list of Product
 */
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let product = await storage.storage.getObj('Product', req.params.id);
        if (!product) {
            return res.status(404).json({ "error": "Not Found" });
        }
        await storage.storage.delete(product);

        return res.status(200).json("{}");

    } catch (e) {
        console.error(`Error deleteProduct: \n\t${e.message}`);
    }

}


/**
 *
 * create new resource in  allProduct
 */
export const createNewProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let params = req.body;
        if (!params) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        if (!('name' in params)) {
            return res.status(400).json({ "error": "Missing name attribute" });
        }

        params['category'] = req.params.id;
        let obj = new Product();
        Object.assign(obj, params);

        await storage.storage.new(obj);

        return res.status(201).json(obj);

    } catch (e) {
        console.error(`Error createNewProduct: \n\t${e.message}`);
    }
}



/**
 *
 * update a resource of my objects
 */
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {

    try {
        await sleep(5);

        let requestBody = req.body;
        if (!requestBody) {
            return res.status(400).json({ "error": "Not Found a JSON" });
        }

        let product = await storage.storage.getObj('Product', req.params.id);
        if (!product) {
            return res.status(404).json({ "error": "Not Found" });
        }

        Object.assign(product, requestBody);
        //console.log(driver.id);
        await storage.storage.save(product);

        return res.status(200).json(product);

    } catch (e) {
        console.error(`Error updateAProduct:\n\t ${e.message}`);
    }
}
