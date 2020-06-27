import { BaseModel } from './base_model';


export class CreditDetail extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public price: number = 0; //decimal num3.toFixed(2)
    public interes_rate: number = 0; //decimal
    public number_of_statalments: number = 0; */

    public constructor(objCopy?: any) {
        super(objCopy);
    }
}
