import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
//import { v4 } from 'uuid';
//import * as storage from './conf_storage';


export abstract class BaseModel {

    @PrimaryGeneratedColumn("uuid")
    //@Column({ nullable: false })
    id: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date = new Date();

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date = new Date();

}
