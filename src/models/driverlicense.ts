import { BaseModel } from './base_model';


export class DriverLicense extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public authorized_categories: string: '';
      public organism_of_traffic: string = ''; */

    public constructor(objCopy?: any) {
        super(objCopy);
    }
}
