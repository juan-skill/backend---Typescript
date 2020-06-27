import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { BaseModel } from './base_model';
import { UserTypeApp } from "./usertype";
import { Credit } from "./credit";
import { Inversion } from "./inversion";



@Entity({ name: 'users_app' })
export class UsersApp extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public number_id: number = 0;
    public first_name: string = '';
    public last_name: string = '';
    public phone_number: number = 0;
    public email: string = '';*/

    @Column({ name: 'number_id', type: 'varchar', nullable: true, length: 11 })
    numberId: number;

    @Column({ name: 'first_name', type: 'varchar', nullable: true, length: 40 })
    firstName: string;

    @Column({ name: 'last_name', type: 'varchar', nullable: true, length: 40 })
    lastName: string;

    @Column({ name: 'phone_number', type: 'varchar', nullable: true, length: 15 })
    phoneNumber: number;

    @Column({ name: 'email', type: 'varchar', nullable: true, length: 60 })
    email: string;

    // composition over inheritance
    /*@Column(type => BaseModel)
    base: BaseModel;*/

    @ManyToOne(type => UserTypeApp, userTypeApp => userTypeApp.usersApp)
    @JoinColumn({ name: 'user_type_id' })
    userTypeApp: UserTypeApp;

    @OneToMany(type => Credit, credit => credit.usersworker, { eager: true, cascade: true })
    credits: Credit[];

    @OneToMany(type => Inversion, inversion => inversion.usersInvestor, { eager: true, cascade: true })
    inversions: Inversion[];

}
