import { BaseModel } from './base_model';
import { Entity, JoinColumn, ManyToOne, Column, OneToMany } from 'typeorm';
import { Category } from './category';
import { CreditDetail } from './credit_detail';


@Entity({ name: 'product' })
export class Product extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public name: string = ''; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/
    @Column({ name: 'name', type: 'varchar', nullable: false, length: 12 })
    name: string;

    @ManyToOne(type => Category, category => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category;

    // a tipo de usuario tiene muchos tipos usuarios
    @OneToMany(type => CreditDetail, creditDetail => creditDetail.product, { eager: true, cascade: true })
    creditsDetail: CreditDetail[];
}
