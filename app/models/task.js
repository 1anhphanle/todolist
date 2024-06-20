const fs = require('fs');

const readAllTask = () => {
    const buffer = fs.readFileSync('app/task.json');
    const taskString = buffer.toString();
    const taskJson = JSON.parse(taskString);
    return taskJson;
}

const createTask = (title, description) => {
    const newTask = {
        id: Math.random().toString(),
        title,
        description,
    };
    let tasks = readAllTask();
    tasks = [...tasks, newTask];
    fs.writeFileSync('app/task.json', JSON.stringify(tasks));
    return newTask;
}

const readDetailTask = (id) => {
    let tasks = readAllTask();
    const task = tasks.find(task => task.id === id);
    return task;
}

const updateTask = (id, title, description) => {
    let tasks = readAllTask();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const oldTask = tasks[index];
        const newTask = { ...oldTask, title, description };
        tasks[index] = newTask;
        fs.writeFileSync('app/task.json', JSON.stringify(tasks));
        return newTask;
    }
    else {
        return false;
    }
}

const deleteTask = (id) => {
    let tasks = readAllTask();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const task = tasks[index];
        tasks = tasks.filter(task => task.id !== id);
        fs.writeFileSync('app/task.json', JSON.stringify(tasks));
        return task;
    }
    else {
        return false;
    }
}

module.exports = {
    readAllTask,
    createTask,
    readDetailTask,
    updateTask,
    deleteTask
}
