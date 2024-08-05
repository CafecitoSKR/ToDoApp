<script >
import HeaderComponent from "../components/header.component.vue";
import Todo from "../components/todo.component.vue";
import InProgress from "../components/InProgress.component.vue";
import DoneComponent from "../components/done.component.vue";


export default {
  name: "todo-app",
  components: {DoneComponent, InProgress, Todo, HeaderComponent},
}

</script>

<template>
  <HeaderComponent class="page-header"></HeaderComponent>
  <div class="container">
    <todo></todo>
    <InProgress></InProgress>
    <DoneComponent></DoneComponent>
  </div>
</template>

<style scoped>
.container{
  display:flex;
  justify-content: space-evenly;
  margin-top: 50px;
}
</style>