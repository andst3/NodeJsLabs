import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {TasksService} from "./tasks.service";
import {Task} from "./tasks.model";

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) {}

    @Get()
    async getAllTasks(): Promise<Task[]> {
        const tasks: Task[] = await this.tasksService.getAllTasks();
        return tasks;
    }

    @Get(':id')
    async getTask(@Param('id') id: string): Promise<Task> {
        const task: Task = await this.tasksService.getTask(id);
        return task;
    }

    @Post()
    async addTask(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('completed') completed: boolean
    ): Promise<Task> {
        const newTask = await this.tasksService.addTask(title, description, completed);
        return newTask;
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string): Promise<string> {
        await this.tasksService.deleteTask(id);
        return 'delete';
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() body: Task): Promise<void> {
        await this.tasksService.updateTask(id, body);
    }
}

