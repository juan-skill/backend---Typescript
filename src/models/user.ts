import { Entity, ChildEntity, Column } from "typeorm";
import { BaseModel } from './base_model';



ChildEntity()
export class UsersApp extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public number_id: number = 0;
    public first_name: string = '';
    public last_name: string = '';
    public phone_number: number = 0;
    public email: string = '';*/

    @Column({ name: 'number_id' })
    numberId: number;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @Column({ name: 'phone_number' })
    phoneNumber: number;

    @Column()
    email: string;


    public constructor(objCopy?: any) {
        super(objCopy);
    }




}
