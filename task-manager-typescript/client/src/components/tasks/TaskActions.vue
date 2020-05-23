<template>
    <div class="body-task-actions" @mousedown="getRouteTasks($event)">
        <div class="pop-up-actions">
            <h1>{{ title }}</h1>
            <input type="text" v-model="titleTask" placeholder="Title">
            <textarea v-model="descriptionTask" placeholder="Description..."></textarea>
            <div>
                <button @click="sendForm">Send</button>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import { namespace } from "vuex-class";
    const tasks = namespace('tasks');

    @Component
    export default class TaskActions extends Vue {
        private title = "Add Product";

        private titleTask = "";
        private descriptionTask = "";

        @tasks.Action
        public addTask!: (obj: {}) => void;

        @tasks.Action
        public getTask!: (id: string) => any;

        @tasks.Action
        public updateTask!: (obj: {}) => void;

        async created() {
            if(!this.$route.meta.add) {
                const task = await this.getTask(this.$route.params.id);
                if(!task)
                    return this.$router.push('/tasks');
                this.titleTask = task.title;
                this.descriptionTask = task.description;
                this.title = 'Edit Task';
            };
        }

        public getRouteTasks($event: any) {
            if($event.target.className === 'body-task-actions')
                this.$router.push('/tasks');
        }

        public sendForm() {
            if(!this.titleTask)
                return alert('Заполните поле Title');
            if(!this.$route.meta.add) {
                this.updateTask({
                    id: this.$route.params.id,
                    options: {
                        title: this.titleTask,
                        description: this.descriptionTask
                    }
                });
                return this.$router.push('/tasks');
            }
            this.addTask({
                title: this.titleTask,
                description: this.descriptionTask
            });
            this.$router.push('/tasks')
        }
    }
</script>

<style scoped lang="sass">
    .body-task-actions
        position: fixed
        width: 100%
        min-height: 100%
        display: flex
        background: rgba(0, 0, 0, 0.5)
        justify-content: center
        align-items: center
        .pop-up-actions
            display: flex
            background-color: white
            width: 50em
            justify-content: center
            flex-direction: column
            padding: 1em
            border-radius: 0.5em
            input[type="text"], textarea
                font-size: 1em
                margin-bottom: 1em
            textarea
                min-height: 20em
            button
                font-size: 1em
                font-weight: bold
                color: white
                background-color: #5cb85c
                border: 1px solid #4cae4c
                padding: 0.5em 1em
                border-radius: 0.2em
                /*width: 10em*/
</style>