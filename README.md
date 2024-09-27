# task-cli

### https://roadmap.sh/projects/task-tracker

## the commands can be run by 

```bash
# Add a new task
task-cli add "Buy groceries"
# Output: Task added with id : ID

# Update a task
task-cli update 1 "Buy groceries and cook dinner"
# Output: Task updated with id : 1
task-cli update zxcv "Buy groceries and cook dinner"
# Output: Task not found

# Put $id to delete one or "all" to delete all tasks'
task-cli delete 1
# Output: Task with id : 1 deleted
task-cli delete all 
# Output: All tasks deleted

# Marking a task as in progress or done
task-cli mark 1 "in progress"
# Output: Task id with 1 status updated to in progress
task-cli mark zxv "done" 
# Output: Task not found

# Listing all tasks
task-cli list

# List tasks by status
task-cli list started
task-cli list in-progress
task-cli list done
```
