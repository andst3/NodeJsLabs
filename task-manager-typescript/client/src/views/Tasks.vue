<template>
    <div class="body-task">
        <div class="tasks-info">
            <h1>Tasks</h1>
            <TasksTable />
        </div>
        <div class="add-task">
            <router-link to="tasks/addTask">
                <font-awesome-icon icon="plus"></font-awesome-icon>
            </router-link>
        </div>
        <router-view />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import TasksTable from "@/components/tasks/TasksTable.vue";

    @Component({
        components: {
            TasksTable
        }
    })
    export default class Tasks extends Vue{

    }
</script>

<style scoped lang="sass">
    .body-task
        position: fixed
        top: 0
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
        .add-task
            margin-top: 1em
            a
                font-size: 1.5em
                color: mediumaquamarine
</style>