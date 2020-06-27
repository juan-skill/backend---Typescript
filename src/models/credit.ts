import { BaseModel } from './base_model';


export class Credit extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public initial_credit: Date = new Date();*/

    public constructor(objCopy?: any) {
        super(objCopy);
    }
}
