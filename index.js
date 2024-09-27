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
    const tasks = loadTasks();
    const newTasks = tasks.filter(t => t.id !== id);
    saveTasks(newTasks);
}

const updateTask = (id, description) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.description = description;
        task.lastUpdatedAt = new Date().toLocaleString();
        saveTasks(tasks);
    }
}

const updateTaskStatus = (id, status) => {
    const tasks = loadTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        task.lastUpdatedAt = new Date().toLocaleString();
        saveTasks(tasks);
        return `status updated to ${status}`;
    }else{
        return 'task not found';
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
            lastUpdatedAt: new Date().toLocaleString(),
        };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log('Task added:', newTask);
    });

// Command to update a task
program
    .command('update <id> <description>')
    .description('Update a task')
    .action((id, description) => {
        updateTask(parseInt(id), description);
        console.log('Task updated');
    });

// Command to delete a task or all tasks
program
    .command('delete <id>')
    .description('Delete task id to delete one or all to delete all tasks')
    .action((id) => {
        id === 'all' ? saveTasks([]) : deleteTask(parseInt(id));
        console.log('Task deleted');
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
    .description('Mark task as done')
    .action((id,status) => {
        const log = updateTaskStatus(parseInt(id), status);
        console.log(log);
    });

program.parse(process.argv);
