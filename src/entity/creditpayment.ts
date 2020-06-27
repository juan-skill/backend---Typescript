import { Entity, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { BaseModel } from './base_model';
import { Credit } from './credit';


@Entity({ name: 'credit_payments' })
export class CreditPayment extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public paymentsDate: Date = new Date();
      public payments: number = 0; //decimal */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'payment', type: 'decimal', nullable: false, precision: 9, scale: 2 })
    payment: number;

    @ManyToOne(type => Credit, credit => credit.creditPayments)
    @JoinColumn({ name: 'credit_id' })
    credit: Credit;

}
