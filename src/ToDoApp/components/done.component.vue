<script>
import {TasksApiService} from "../services/tasks-api.services.js";

export default {
  name:"DoneComponent",
  data(){
    return{
      value1:'',
      tasks:[],
      filteredTasks:[],

      tasksService:null
    }
  },
  created() {
    this.tasksService=new TasksApiService();


    this.getTasksDone()
  },
  methods:{
    async getTasksDone(){
      await this.tasksService.getAll().then(response => {
        this.tasks=response.data.filter(task=>task.status===2)
        this.filteredTasks=this.tasks
      })
    },
    searchTasks(){
      if(this.value1){
        this.filteredTasks= this.tasks.filter((task)=>{return task.title.toLowerCase().includes(this.value1.toLowerCase()) || task.description.toLowerCase().includes(this.value1.toLowerCase())})
      }else{
        this.filteredTasks=this.tasks
      }
    },
    async deleteTask(taskId){
      try{
        this.tasksService.delete(taskId)
        await this.getTasksDone()
      }catch(error){
        console.log("error al eliminar",error)
      }
    }
  },
  watch:{
    value1(){
      this.searchTasks();
    }
  }
}
</script>

<template>
  <!-- Formulario de agregar Task-->
  <div class="todo-container">
    <div>
      <picture class="Done">
        <h1>Tasks Done</h1>
      </picture>
    </div>

    <div class="search-container">
      <pv-iconField>
        <pv-inputIcon class="pi pi-search" ></pv-inputIcon>
        <pv-inputText  v-model="value1" placeholder="Search" class="search"></pv-inputText>
      </pv-iconField>
    </div>
    <pv-scrollPanel style="width: 100%; height: 415px; overflow-y: auto;">
      <div class="Tasks" v-for="task in filteredTasks" :key="task.id" >
        <div class="tasks-text">
          <h3>{{task.title}}</h3>
          <span>{{task.description}}</span>
          <span>{{task.due_date}}</span>
        </div>
        <div class="tasks-buttons">
          <pv-button class="delete" id="button" label="Delete" @click="deleteTask(task.id)"></pv-button>
        </div>

      </div>
    </pv-scrollPanel>
  </div>
</template>
<style scoped>
.todo-container{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 500px;
  background-color: #7db4b5;

}
.Tasks{
  display: flex;
  justify-content: space-between;
  margin:10px 10px 0 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #e0eff1;
}
.tasks-text{
  display: flex;
  flex-direction: column;
  width: 60%;
}
.tasks-buttons{
  display: grid;
  grid-template-columns:1fr 1fr;
  grid-template-rows: repeat(3,1fr);
  gap: 5px;
  width: 40%;
  height: 100%;
  margin-top: 30px;
}



#button{
  border-radius: 5px;

}

.done:hover{
  background-color: #23FF30;
  transition-duration: 0.3s;
}
.delete:hover{
  background-color: #FF0000;
  transition-duration: 0.3s;
}
.logoToDo h1{
  margin: 10px 0 0 5px;
}
.search-container{
  margin:5px;
  width: 100%;
}
.search-container .pi-search{
  padding: 5px;
}
.search{
  all:unset;
  background-color: white;
  border-radius: 3px;
  padding: 3px;
  width: 89%;
}
.search:hover{
  outline: black solid 2px;
  transition-duration: 0.1ms;
}

.dialog-popup .dialog-title h1{
  font-size: 25px;
  margin:10px;
}
</style>