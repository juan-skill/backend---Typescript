import { NextFunction, Request, Response } from 'express';
import HttpException from './HttpException';


// 404
export function error400(req, res, next) {
    return res.status(404).send({ message: 'Not found.' });
}

// 500 - Any server error
export function error500(err, req, res, next) {
    return res.status(500).send({ error: err });
}



export function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
            status,
            message,
        })
}

//export default errorMiddleware;
