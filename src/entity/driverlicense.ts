import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { Category } from "./category";


@Entity({ name: 'driver_license' })
export class DriverLicense extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public authorized_categories: string: '';
      public organism_of_traffic: string = ''; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
        }
    */
    @Column({ name: 'authorized_categories', type: 'varchar', nullable: true, length: 100 })
    authorized: string;

    @Column({ name: 'organis_of_traffic', type: 'varchar', nullable: true, length: 100 })
    organism: string;

    // a tipo de usuario tiene muchos tipos usuarios
    @OneToMany(type => Category, category => category.driverLicense, { eager: true, cascade: true })
    categorys: Category[];
}
