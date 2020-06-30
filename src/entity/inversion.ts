import { Entity, ChildEntity, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { UsersApp } from './user';
import { InversionDetail } from "./inversionDetail";
import { Withdrawal } from "./withdrawl";


@Entity({ name: 'inversion' })
export class Inversion extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public payment: number = 0;
    public inversionDate: Date = new Date();
    public last_name: string = ''; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'payment', type: 'decimal', nullable: false, precision: 9, scale: 2 })
    payment: number;

    @ManyToOne(type => UsersApp, usersInvestor => usersInvestor.inversions)
    @JoinColumn({ name: "investor_id" })
    usersInvestor: UsersApp;

    @OneToMany(type => InversionDetail, inversionDetail => inversionDetail.inversion, { eager: true, cascade: true })
    inversionDetail: InversionDetail[];

    @OneToMany(type => Withdrawal, withdraw => withdraw.inversion, { eager: true, cascade: true })
    withdraws: Withdrawal[];
}
