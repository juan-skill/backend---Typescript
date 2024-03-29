import * as dotenv from 'dotenv';
import { FileStorage } from './engine/file_storage';
import { DBStorage } from './engine/db_storage';

dotenv.config({ path: `/home/root/new_project_v2/MysqlProject/src/.env` });

export let storage: FileStorage | DBStorage = null;

if (process.env.HBNB_TYPE_STORAGE.toString() !== 'db') {
    console.log('new FileStorage');
    storage = new FileStorage();
} else {
    console.log('new DBStorage');
    storage = new DBStorage();
}

//console.log(`I am conf_storage`);
storage.reload();


//console.log(`type storage    ->   ${storage.constructor.name}`);
