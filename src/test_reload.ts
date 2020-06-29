//Index.ts(entry point)

import "reflect-metadata";
import { createConnection } from "typeorm";
import { UsersApp } from "./entity/user";
import { UserTypeApp } from "./entity/usertype";


createConnection().then(async connection => {

    // crear dos tipos de usuario
    const usert = new UserTypeApp();
    usert.name = 'worker';

    const usert2 = new UserTypeApp();
    usert2.name = 'investor';

    connection.manager.save(usert);
    connection.manager.save(usert2);

    // crear dos usuario de tipo worker
    const user1 = new UsersApp();
    user1.firstName = 'Betty';

    const user2 = new UsersApp();
    user2.firstName = 'Holberton';

    // asociacion de dos usuarios a un perfil
    usert.usersApps = [user1, user2];

    connection.manager.save(user1);
    connection.manager.save(user2);

}).catch(error => console.log(error));
