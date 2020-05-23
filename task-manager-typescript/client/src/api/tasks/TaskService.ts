import axios from 'axios';
import {ITask} from "@/common/interfaces/ITask";

const url = 'http://localhost:3000/tasks';

export class TaskService {
    static async getAllTasks(): Promise<ITask[] | string> {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (e) {
            console.log(e.message);
            return e.message;
        }
    }

    static async getTask(id: string): Promise<ITask | boolean> {
        try {
            const response = await axios.get(`${url}/${id}`);
            return response.data;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    static async addTask(title: string, description: string, completed: boolean): Promise<ITask[] | string> {
        try {
            await axios.post(url, {
                title,
                description,
                completed
            })
            const tasks = await this.getAllTasks();
            return tasks;
        } catch (e) {
            console.log(e.message);
            return e.message;
        }
    }

    static async deleteTask(id: string) {
        try {
            await axios.delete(`${url}/${id}`);
            const tasks = this.getAllTasks();
            return tasks;
        } catch (e) {
            console.log(e.message);
            return e.message;
        }
    }

    static async updateTask(id: string, obj: {}) {
        try {
            await axios.put(`${url}/${id}`, obj);
            const tasks = await this.getAllTasks();
            return tasks;
        } catch(e) {
            console.log(e.message);
            return e.message;
        }
    }
}