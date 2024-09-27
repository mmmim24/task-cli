#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');

const filePath = `${__dirname}/tasks.json`;

// Helper functions to load and save tasks
const loadTasks = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
};

const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const deleteTask = (id) => {
    if(id === 'all'){
        saveTasks([]);
        return "All tasks deleted";
    }else{
        const tasks = loadTasks();
        const newTasks = tasks.filter(t => t.id !== parseInt(id));
        saveTasks(newTasks);
        return `Task with id : ${id} deleted`;
    }
}

const updateTask = (id, description) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.description = description;
        task.updatedAt = new Date().toLocaleString();
        saveTasks(tasks);
        return `Task updated with id : ${id}`;
    }
    else{
        return 'Task not found';
    }
}

const updateTaskStatus = (id, status) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toLocaleString();
        saveTasks(tasks);
        return `Task id with ${id} status updated to ${status}`;
    }else{
        return 'Task not found';
    }
}

// Command to add a new task
program
    .command('add <description>')
    .description('Add a new task')
    .action((description) => {
        const tasks = loadTasks();
        const lastTask = tasks[tasks.length - 1];
        const newTask = {
            id: lastTask ? lastTask.id + 1 : 1,
            description,
            status: 'started',
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log(`Task added with id : ${newTask.id}`, newTask);
    });

// Command to update a task
program
    .command('update <id> <description>')
    .description('Update a task')
    .action((id, description) => {
        const log = updateTask(parseInt(id), description);
        console.log(log);
    });

// Command to delete a task or all tasks
program
    .command('delete <id>')
    .description('Put $id to delete one or "all" to delete all tasks')
    .action((id) => {
        log = deleteTask(id);
        console.log(log);
    });

// Command to list tasks
program
    .command('list [status]')
    .description('List tasks by status')
    .action((status) => {
        const tasks = loadTasks();
        const filteredTasks = status ? tasks.filter(t => t.status === status) : tasks;
        console.log(filteredTasks);
    });

// Command to update task status
program
    .command('mark <id> <status>')
    .description('Mark task status')
    .action((id,status) => {
        const log = updateTaskStatus(parseInt(id), status);
        console.log(log);
    });

program.parse(process.argv);
