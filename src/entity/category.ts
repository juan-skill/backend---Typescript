import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { MotorCycle } from "./moto";
import { DriverLicense } from "./driverlicense";
import { Product } from "./product";


@Entity({ name: 'category' })
export class Category extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @ManyToOne(type => MotorCycle, motorCycle => motorCycle.categorys)
    @JoinColumn({ name: "moto_id" })
    motorCycle: MotorCycle;

    @ManyToOne(type => DriverLicense, driverLicense => driverLicense.categorys)
    @JoinColumn({ name: "driver_id" })
    driverLicense: DriverLicense;

    // a tipo de usuario tiene muchos tipos usuarios
    @OneToMany(type => Product, product => product.category, { eager: true, cascade: true })
    products: Product[];
}
