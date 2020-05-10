<template>
    <div class="body">
        <img alt="Vue logo" src="../assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>

</template>

<script>
    import HelloWorld from "../components/HelloWorld";

    export default {
        name: "Home",
        components: {
            HelloWorld
        },
        created() {
            document.title = 'Home';
        }
    }
</script>

<style scoped>
    .body {
        margin-top: 60px;
    }
</style>