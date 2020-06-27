import { ChildEntity, Column } from "typeorm";
import * as storage from './conf_storage';
import { BaseModel } from './base_model';


//@ChildEntity({ name: 'user_type_app' })
export class UserTypeApp extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    //public type: string = '';

    //  @Column({ type: 'varchar', nullable: false, length: 12 })
    //nameType: string;

    //private _userlist = [];

    public constructor(objCopy?: any) {
        super(objCopy);
    }

    get userlist() {
        let _userlist = [];
        let allObjs = storage.storage.all('UsersApp');
        for (let key in allObjs) {
            //console.log(`key: ${key}  value: ${allObjs[key]}`);
            if (allObjs[key].user_type_id = this.id) {
                _userlist.push(allObjs[key]);
            }
        }
        return (_userlist);
    }

}
