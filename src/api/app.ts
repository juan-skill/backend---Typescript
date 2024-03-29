import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as storage from '../models/conf_storage';
import express = require('express');
import morgan = require('morgan');
import helmet = require('helmet');
import cors = require('cors');
import compression = require('compression');
import * as errMiddleware from './exceptions/error.middleware';

import * as index from './routes/indexr';
import * as userType from './routes/userTypeApp.routes';
import * as motorCycle from './routes/motorCycle.routes';
import * as driverLicense from './routes/driverlicense.routes';
import * as movementType from './routes/movementyType.routes';
import * as userAp from './routes/usersApp.routes';
import * as inversin from './routes/inversion.routes';
import * as inversionDet from './routes/inversionDetail.routes';
import * as withdrawal from './routes/withdrawal.routes';
import * as credit from './routes/credit.routes';
import * as creditDetail from './routes/creditDetail.routes';
import * as creditPayment from './routes/creditpayment.routes';
import * as category from './routes/category.routes';
import * as product from './routes/product.routes';



class Server {

    public app: express.Application;

    constructor() {
        dotenv.config({ path: `/home/root/new_project_v2/MysqlProject/src/.env` });
        this.app = express();
        this.config();
        this.routes();
    }

    public async config() {
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(errMiddleware.errorMiddleware);
        //this.app.use(this.shutdownSession);
        //this.app.use(errMiddleware.error400);
        //this.app.use(errMiddleware.error500);

        // database
        this.app.set('port', process.env.HBNB_API_PORT || 3000);
        this.app.set('hostname', process.env.HBNB_API_HOST || '0.0.0.0');
        //await storage.storage.all();
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }

    public async shutdownSession(): Promise<void> {
        await storage.storage.closeSession();
    }

    public routes(): void {
        this.app.use('/api/v1/', index.router);
        this.app.use('/api/v1/', userType.router);
        this.app.use('/api/v1/', motorCycle.router);
        this.app.use('/api/v1/', driverLicense.router);
        this.app.use('/api/v1/', movementType.router);
        this.app.use('/api/v1/', userAp.router);
        this.app.use('/api/v1/', inversin.router);
        this.app.use('/api/v1/', inversionDet.router);
        this.app.use('/api/v1/', withdrawal.router);
        this.app.use('/api/v1/', credit.router);
        this.app.use('/api/v1/', creditDetail.router);
        this.app.use('/api/v1/', creditPayment.router);
        this.app.use('/api/v1/', category.router);
        this.app.use('/api/v1/', product.router);
    }
}


const server = new Server();

server.start();
