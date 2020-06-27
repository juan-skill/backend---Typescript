import { BaseModel } from './base_model';
import { Entity, Column, OneToMany } from 'typeorm';
import { Movement } from './movement';


@Entity({ name: 'movement_type' })
export class MovementType extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public type: string = ''; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
        }
    */

    @Column({ name: 'movement_id', type: 'uuid', nullable: false })
    movementId: string;

    @Column({ name: 'movement_date', type: 'datetime', })
    numberMonth: Date = new Date();

    // a tipo de usuario tiene muchos tipos usuarios
    @OneToMany(type => Movement, movement => movement.movementType, { eager: true, cascade: true })
    movements: Movement[];

}
