// Test .get() and .count() methods

import * as storage from './models/conf_storage';
import { UserTypeApp } from './models/usertype';

//storage.storage.all();


//function async exercise(): Promise < void> {



console.log(`All objects: ${storage.storage.count()}`);
console.log(`UsersType objects ${storage.storage.count('UserTypeApp')}`);



//let firstUserTypeId = Object.entries(storage.storage.all('UserTypeApp'))[0][1];
//console.log(` id  ${firstUserTypeId}`);
//console.log(`first userType ${storage.storage.getObj('UserTypeApp', '01d87957-0976-4635-a59c-48a2a192bc68')}`);
//}
