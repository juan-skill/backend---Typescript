import { v4 } from 'uuid';
import * as storage from './conf_storage';


export class BaseModel {

    id: string = '';
    created_at: Date = new Date();
    updated_at: Date = new Date();

    public constructor(objCopy?: any) {
        if (objCopy != null) {
            //console.log('I am here. I am receiving  a obj -----------------------------------------------');
            for (let k in objCopy) {

                if (k === 'created_at' || k === 'updated_at') {
                    this[k] = new Date(objCopy[k]);
                }
                if (k !== '__class__') {
                    //console.log(` this BaseModel  -->  ${this.constructor.name} `);
                    //if (k === 'id') {
                    //this.id = objCopy[k];
                    //}
                    this[k] = objCopy[k];
                }
            }
            if (!('id' in objCopy)) {
                objCopy.id = v4().toString();
            }

        } else {
            this.id = v4().toString();
            this.created_at = new Date();
            this.updated_at = this.created_at;
        }
    }

    toRepr(): any[] {
        let s: any[] = [];
        for (let k in this) {
            if (k !== 'toRepr' && k !== 'constructor' && k !== 'toString'
                && k != 'save' && k !== 'toDict' && k !== 'delete') {
                s.push(`${k}: ${this[k]}`);
            }
        }
        return (s);
    }

    toString(): string {
        return `[${this.constructor.name}] (${this.id}) {${this.toRepr().join()}}`;
    }

    save(): void {
        this.updated_at = new Date();
        //console.log(`this update_at save ${this.updated_at.toISOString()}`);
        //console.log(`this create_at save ${this.created_at.toISOString()}`);
        storage.storage.new(this);
        storage.storage.save();
    }

    public toDict(): { [key: string]: any } {
        let objCopy: { [key: string]: any } = {};

        for (let key in this) {
            objCopy[key] = this[key];
        }

        objCopy.__class__ = this.constructor.name;
        objCopy.created_at = new Date(this.created_at).toISOString();
        objCopy.updated_at = new Date(this.updated_at).toISOString();
        //console.log(`this toDict updated_at ${objCopy.updated_at}`);
        //console.log(`this toDict created_at ${objCopy.created_at}`);

        return (objCopy);
    }

    public delete(baseModel: BaseModel): void {
        storage.storage.delete(baseModel);
    }
}
