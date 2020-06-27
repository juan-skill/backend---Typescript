/*
import "reflect-metadata";
import { createConnection } from "typeorm";
import { UsersApp } from "./entity/user";
import { UserTypeApp } from "./entity/usertype";


createConnection()
    .then(async connection => {

        // crear dos tipos de usuario
        const usert = new UserTypeApp();
        usert.name = 'worker';

        const usert2 = new UserTypeApp();
        usert2.name = 'investor';

        // crear dos usuario de tipo worker
        const user1 = new UsersApp();
        user1.firstName = 'Betty';

        const user2 = new UsersApp();
        user2.firstName = 'Holberton';

        // asociacion de dos usuarios a un perfil
        usert.usersApp = [user1, user2];

        connection.manager.save(usert);
        connection.manager.save(usert2);

    })
    .catch(error => console.log(error));


*/
/*
let connection;
(async () => {
    const connection: Connection = await createConnection({
        type: "mysql",
        host: process.env.HBNB_MYSQL_PORT,
        port: parseInt(process.env.HBNB_PORT),
        username: process.env.HBNB_MYSQL_USER,
        password: process.env.HBNB_MYSQL_PWD,
        database: process.env.HBNB_MYSQL_DB
    });

    // crear dos tipos de usuario
    const usert = new UserTypeApp();
    usert.name = 'worker';

    const usert2 = new UserTypeApp();
    usert2.name = 'investor';

    // crear dos usuario de tipo worker
    const user1 = new UsersApp();
    user1.firstName = 'Betty';

    const user2 = new UsersApp();
    user2.firstName = 'Holberton';

    // asociacion de dos usuarios a un perfil
    usert.usersApp = [user1, user2];

    connection.manager.save(usert);
    connection.manager.save(usert2);

})();
*/
