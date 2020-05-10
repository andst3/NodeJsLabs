<template>
    <div class="body">
        <div class="tasksInfo">
            <h1>Tasks</h1>
            <table>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Action</th>
                </tr>
                <TaskComponent/>
            </table>
        </div>
    </div>
</template>

<script>
    import TaskComponent from "../components/tasks/TaskComponent";



    export default {
        name: "Tasks",
        components: {
            TaskComponent
        },
        created() {
            document.title = 'Tasks';
        }
    }
</script>

<style scoped>

    .body {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .tasksInfo {
        border: 1px solid black;
    }

    .tasksInfo table th {
        padding: 1em;
        background-color: #0081da;
        color: white;
        font-weight: normal;
    }

</style>