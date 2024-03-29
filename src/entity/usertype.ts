import { Entity, Column, OneToMany } from "typeorm";
import { BaseModel } from './base_model';
import { UsersApp } from "./user";


@Entity({ name: 'user_type_app' })
export class UserTypeApp extends BaseModel {


    @Column({ name: 'name_type', type: 'varchar', nullable: true, length: 12 })
    name: string;

    /*@Column(type => BaseModel)
    base: BaseModel;*/

    //    @OneToMany(type => UsersApp, usersApp => usersApp.userTypeApp, { cascade: ["insert", "update", "remove"] })
    @OneToMany(type => UsersApp, usersApp => usersApp.userTypeApp, { eager: true, cascade: true })
    usersApps: UsersApp[];
}
