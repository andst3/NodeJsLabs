import {Injectable} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {Task} from "./tasks.model";


@Injectable()
export class TasksService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

    async addTask(title: string, description: string, completed: boolean): Promise<Task> {
        const newTask = new this.taskModel({title, description, completed});
        await newTask.save();
        return newTask as Task;
    }

    async getAllTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find({});
        return tasks as Task[];
    }

    async getTask(id: string): Promise<Task> {
        const task = await this.taskModel.findById(id, {_id: 0});
        return task as Task;
    }

    async deleteTask(id: string): Promise<void> {
        await this.taskModel.deleteOne({_id: id});
    }

    async updateTask(id: string, body: {}): Promise<void> {
        console.log(id, body);
        await this.taskModel.updateOne({_id: id}, body);
    }

}