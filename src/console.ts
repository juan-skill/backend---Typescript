import 'reflect-metadata';
import * as dotenv from 'dotenv';
import * as inquirer from 'inquirer';
import { Handle } from './console_module/conf';


dotenv.config();
let path = `${__dirname}/../src/.env`;
dotenv.config({ path: path });
//console.log(` => ${process.env.HBNB_DATABASE}`);


enum Commands {
    quit = 'Quit console',
    clean = 'Clean your screen',
    help = 'Help command',
    inputc = 'Input command'
}



function promptBasics(message: string): void {
    console.clear();
    console.log(`\n${message}\n`);
}


async function promtInputCommand(): Promise<void> {

    const answer = await inquirer.prompt({
        type: 'input',
        name: '(hbtn)',
    });

    let hand = new Handle();
    let line = answer['(hbtn)'];

    switch (line.split(' ')[0]) {
        case 'create':
            hand.createInstance(line);
            break;
        case 'show':
            await hand.showInstance(line);
            break;
        case 'destroy':
            await hand.destroyInstance(line);
            break;
        case 'all':
            await hand.showSeveralInstance(line);
            break;
        case 'update':
            await hand.updateInstance(line);
            break;
        default:
            console.log('\n** Unknown command **\n');
            break;
    }

    promptUser();
}

async function promptUser() {

    const answer = await inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose Option',
        choices: Object.values(Commands)
    })

    switch (answer['command']) {
        case Commands.help:
            promptBasics(
                `Documented commands (type help <topic>):
========================================
help                         help command
quit                         quit console
clean                        clean your screen

create a new instance       'Type: create <class> e.g(type: create BaseModel)
show an instance            'Type: show <class> <id> e.g(type: show BaseModel 1234-1234-1234)
destroy an instance         'Type: destroy <class> <id> e.g(type: destroy BaseModel 1234-1234-1234)
prints all instances        'Type: all <class> or all e.g(type: all BaseModel 1234-1234-1234)
update an instance          'Type: update <class name> <id> <attribute name> "<attribute value>"
`);

            promptUser();
            break;
        case Commands.quit:
            break;
        case Commands.clean:
            console.clear();
        //break;
        case Commands.inputc:
            promtInputCommand();
            break;

    }
}

promptUser();
