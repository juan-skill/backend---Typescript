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
    }
}


const server = new Server();

server.start();
