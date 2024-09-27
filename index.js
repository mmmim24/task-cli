#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');

console.log(__dirname);

const filePath = '/home/mmmim24/workspace/task-cli/tasks.json';

// Helper functions to load and save tasks
const loadTasks = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8') || '[]');
};

const saveTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Command to add a new task
program
    .command('add <description>')
    .description('Add a new task')
    .action((description) => {
        const tasks = loadTasks();
        const newTask = {
            id: tasks.length + 1,
            description,
            status: 'pending',
            createdAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        saveTasks(tasks);
        console.log('Task added:', newTask);
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

// Command to mark task as done
program
    .command('done <id>')
    .description('Mark task as done')
    .action((id) => {
        const tasks = loadTasks();
        const task = tasks.find(t => t.id === parseInt(id));
        if (task) {
            task.status = 'done';
            saveTasks(tasks);
            console.log('Task marked as done:', task);
        } else {
            console.log('Task not found');
        }
    });

program.parse(process.argv);
