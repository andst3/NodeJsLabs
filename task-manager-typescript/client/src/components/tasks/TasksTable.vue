<template>
    <table>
        <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
            <th>Action</th>
        </tr>
        <tr v-for="task in tasks" :key="task._id">
            <td>{{ task.title }}</td>
            <td>{{ task.description }}</td>
            <td :class="getCompletedClass(task.completed)" @click="completedUpdateTask(task._id, task.completed)">{{ task.completed }}</td>
            <td>
                <router-link :to="'tasks/' + task._id">Edit Task</router-link>
                <span class="actionTasks" @click="deleteTask(task._id)">Delete</span>
            </td>
        </tr>
    </table>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import { namespace } from "vuex-class";
    const tasks = namespace('tasks');

    @Component
    export default class TasksTable extends Vue {
        @tasks.State
        public tasks!: string;

        @tasks.Action
        public getAllTasks!: () => void

        @tasks.Action
        public deleteTask!: (id: string) => void

        @tasks.Action
        public updateTask!: (obj: {}) => void

        getCompletedClass(completed: boolean) {
            if(!completed) {
                return 'no-completed-task'
            }
            return 'completed-task'
        }

        public completedUpdateTask(id: string, completed: boolean) {
            this.updateTask({
                id,
                options: {
                    completed: !completed
                }
            });
        }

        created() {
            this.getAllTasks();
        }
    }
</script>

<style scoped lang="sass">
    table
        td
            padding: 1em 1em
            font-weight: bolder
            &.completed-task
                color: mediumaquamarine
                &:hover
                    cursor: pointer
                    text-decoration: underline
            &.no-completed-task
                color: orangered
                &:hover
                    cursor: pointer
                    text-decoration: underline

        tr
            &:nth-child(2n + 1)
                background-color: #e7eae9
        th
            padding: 1em
            background-color: #0081da
            color: white
            font-weight: normal
        .actionTasks, a
            color: dodgerblue
            margin: 0.5em
            text-decoration: none
            &:hover
                cursor: pointer
                color: blue
                text-decoration: underline

</style>