import { BaseModel } from './base_model';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { MovementType } from './movementType';


@Entity({ name: 'movement' })
export class Movement extends BaseModel {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public movementDate: Date = new Date();
    public movementId: string: ''; */


    /*    public constructor(objCopy?: any) {
            super(objCopy);
        }

    */

    @Column({ name: 'name_type', type: 'varchar', nullable: false, length: 12 })
    name: string;

    @ManyToOne(type => MovementType, movementType => movementType.movements)
    @JoinColumn({ name: "user_type_id" })
    movementType: MovementType;
}
