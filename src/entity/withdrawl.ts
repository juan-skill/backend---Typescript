import { Entity, ChildEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { Inversion } from "./inversion";


@Entity({ name: 'withdrawal' })
export class Withdrawal extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public withdrawalFunds: number = 0; //Deciaml
      public withdrawalDate: Date = new Date(); */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'withdraw_funds', type: 'decimal', nullable: false, precision: 9, scale: 2 })
    withdrawFunds: number;

    @ManyToOne(type => Inversion, inversion => inversion.withdraws)
    @JoinColumn({ name: "inversion_id" })
    inversion: Inversion;
}
