import { BaseModel } from './base_model';
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity({ name: 'capital' })
export class Capital {

    //no es posible especificar estos atributor como parte de la instancia UsersApp
    //por que al leerlos del archivo se cambiaran a los valores por defecto es decir 1 0
    // si queremos que pase estor debemos recibir valor desde el constructor
    //hacer debugging
    /*public capitalAmount: number = 0;
      public reserve: number = 0; //decimal
     public number_of_credit: number = 0;
     public number_of_inversions = 0; */

    /*    public constructor(objCopy?: any) {
            super(objCopy);
            }*/
    @PrimaryColumn()
    id: number;

    @Column({ name: 'capital_amount', type: 'decimal', nullable: true, precision: 12, scale: 2, default: 0 })
    capitalAmount: number;

    @Column({ name: 'reserve', type: 'decimal', nullable: true, precision: 12, scale: 2, default: 0 })
    reserve: number;

    @Column({ name: 'number_of_credits', type: 'decimal', nullable: true, default: 0 })
    creditsnumber: number;

    @Column({ name: 'number_of_inversions', type: 'decimal', nullable: true, default: 0 })
    inversionsNumber: number;
}
