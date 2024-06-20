const yargs = require('yargs');
const { readAllTask, createTask, readDetailTask, updateTask, deleteTask } = require('./models/task');

yargs.command({
    command: 'hello',
    describe: 'Hello command',
    handler: () => {
        console.log('Hello command executed');
    }
});

yargs.command({
    command: 'create',
    describe: 'Create a new item',
    builder: {
        title: {
            describe: 'Title of the item',
            type: 'string'
        },
        description: {
            describe: 'Description of the item',
            type: 'string'
        }
    },
    handler: (args) => {
        console.log('Create command executed');
        const result = createTask(args.title, args.description);
        console.log("result: ", result);
    }
});

yargs.command({
    command: 'read-all',
    describe: 'Read all items',
    handler: () => {
        const result = readAllTask();
        console.log('Read all command executed');
        console.log(result);
    }
});

yargs.command({
    command: 'read-detail',
    describe: 'Read detail of an item',
    builder: {
        id: {
            describe: 'Id of the item',
            type: 'number'
        },
    },
    handler: (args) => {
        console.log('Read detail command executed');
        const { id } = args;
        const task = readDetailTask(id);
        if (task) {
            console.log(task);
        }
        else {
            console.log('Không tìm thấy task');
        }
    }
});

yargs.command({
    command: 'update',
    describe: 'Update an item',
    builder: {
        id: {
            describe: 'Id of the item',
            type: 'number'
        },
        title: {
            describe: 'Title of the item',
            type: 'string'
        },
        description: {
            describe: 'Description of the item',
            type: 'string'
        }
    },
    handler: (args) => {
        console.log('Update command executed');
        const { id, title, description } = args;
        const result = updateTask(id, title, description);
        if (result) {
            console.log(result);
        }
        else {
            console.log('Không tìm thấy task');
        }
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete an item',
    builder: {
        id: {
            describe: 'Id of the item',
            type: 'number'
        }
    },
    handler: (args) => {
        console.log('Delete command executed');
        const { id } = args;
        const result = deleteTask(id);
        if (result) {
            console.log(result);
        }
        else {
            console.log('Không tìm thấy task');
        }
    }
});

yargs.parse();