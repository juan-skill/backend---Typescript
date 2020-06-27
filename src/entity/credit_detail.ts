import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseModel } from './base_model';
import { Credit } from './credit';
import { Product } from './product';


@Entity({ name: 'credit_detail' })
export class CreditDetail extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public price: number = 0; //decimal num3.toFixed(2)
    public interes_rate: number = 0; //decimal
    public number_of_statalments: number = 0; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/

    @Column({ name: 'price', type: 'decimal', nullable: false, precision: 9, scale: 2 })
    payment: number;

    @Column({ name: 'interes_rate', type: 'decimal', nullable: false, precision: 3, scale: 2 })
    interesRate: number;

    @Column({ name: 'number_of_instalments', type: 'int', nullable: false, precision: 2 })
    instalments: number;

    @ManyToOne(type => Credit, credit => credit.creditsDetail)
    @JoinColumn({ name: 'credit_id' })
    credit: Credit;

    @ManyToOne(type => Product, product => product.creditsDetail)
    @JoinColumn({ name: 'product_id' })
    product: Product;
}
