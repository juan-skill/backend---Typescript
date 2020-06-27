import { BaseModel } from './base_model';


export class Capital extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public capitalAmount: number = 0;
      public reserve: number = 0; //decimal
     public number_of_credit: number = 0;
     public number_of_inversions = 0; */

    public constructor(objCopy?: any) {
        super(objCopy);
    }
}
