import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    completed: {type: Boolean, required: true}
}, {strict: true});

export interface Task extends mongoose.Document{
    title: string,
    description: string,
    completed: boolean
}