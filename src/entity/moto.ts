import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { Category } from "./category";


@Entity({ name: 'motor_cycle' })
export class MotorCycle extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public reference: string = '';
      public engine: string = '';
      public cylinder_capacity: string = '';
      public performance: string = '';
      public turnedOn: string: string = '';*/

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'reference', type: 'varchar', nullable: true, length: 100 })
    reference: string;

    @Column({ name: 'engine', type: 'varchar', nullable: true, length: 100 })
    engine: string;

    @Column({ name: 'cylinder_capacity', type: 'varchar', nullable: true, length: 100 })
    cylinder: string;

    @Column({ name: 'performance', type: 'varchar', nullable: true, length: 100 })
    performance: string;


    // a tipo de usuario tiene muchos tipos usuarios
    @OneToMany(type => Category, category => category.motorCycle, { eager: true, cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    categorys: Category[];

}
