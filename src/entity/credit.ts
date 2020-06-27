import { BaseModel } from './base_model';
import { Entity, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UsersApp } from './user';
import { CreditDetail } from './credit_detail';
import { CreditPayment } from './creditpayment';


@Entity({ name: 'credit' })
export class Credit extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public initial_credit: Date = new Date();*/

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    // composition over inheritance
    /*@Column(type => BaseModel)
    base: BaseModel;*/

    @ManyToOne(type => UsersApp, usersworker => usersworker.credits)
    @JoinColumn({ name: "worker_id" })
    usersworker: UsersApp;


    @OneToMany(type => CreditDetail, creditDetail => creditDetail.credit, { eager: true, cascade: true })
    creditsDetail: CreditDetail[];

    @OneToMany(type => CreditPayment, creditPayment => creditPayment.credit, { eager: true, cascade: true })
    creditPayments: CreditPayment[];

}
