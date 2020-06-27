import { BaseModel } from './base_model';


export class Inversion extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public payment: number = 0;
    public inversionDate: Date = new Date();
    public last_name: string = ''; */

    public constructor(objCopy?: any) {
        super(objCopy);
    }
}
