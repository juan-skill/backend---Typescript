import { Entity, ChildEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { Inversion } from "./inversion";


@Entity({ name: 'inversion_detail' })
export class InversionDetail extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public interes_rate: number = 0;
    public initial_term: number = 0;
    public final_term: number = 0;
    public number_of_month = 0; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'interes_rate', type: 'decimal', nullable: true, precision: 3, scale: 2 })
    interesRate: number;

    @Column({ name: 'number_of_month', type: 'int', precision: 2, nullable: true })
    numberMonth: number;

    @ManyToOne(type => Inversion, inversion => inversion.inversionDetail)
    @JoinColumn({ name: "inversion_id" })
    inversion: Inversion;

}
