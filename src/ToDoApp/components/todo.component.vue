<script>
import {TasksApiService} from "../services/tasks-api.services.js";

export default {
  name: "todo",

  data(){
    return{
      tasksService:null,
      tasks:[],
      filteredTasks:[],
      value1:null,
      visibleAddTask:false,
      visibleEditTask:false,
      editTaskId:null,

      NewTaskTitle:'',
      NewTaskDescription:'',
      NewTaskdueDate:'',

    }
  },
  created() {
    this.tasksService= new TasksApiService();

    this.getTasks()
  },
  methods:{
    async getTasks(){
      try{
        this.tasksService.getAll().then(response => {
          this.tasks = response.data.filter(task=>task.status===0);
          this.filteredTasks = this.tasks
          console.log(this.filteredTasks);

        })
      }catch(err){
        console.log("Error al obtener las tareas", err);
      }
    },
    searchTasks(){
      if(this.value1){
        this.filteredTasks = this.tasks.filter(task => {
          return task.title.toLowerCase().includes(this.value1.toLowerCase()) ||
              task.description.toLowerCase().includes(this.value1.toLowerCase)
        })
      }else{
        this.filteredTasks = this.tasks
      }
    },
    async AddTask(){
      const task = {
        title: this.NewTaskTitle,
        description:this.NewTaskDescription,
        status:0,
        due_date:this.NewTaskdueDate
      }
      try{
        await this.tasksService.create(task).then(response => {
          console.log(response.data)
          this.getTasks()
        })
      }catch(err){
        console.log("Error al crear tarea",err);
      }
      this.closePopUp()
      this.NewTaskTitle=''
      this.NewTaskDescription=''
      this.NewTaskdueDate=''
    },
    async updateTaskStatus(status,taskId){
      try{
        const task=this.tasks.find(task=>task.id===taskId)
        task.status=status
        await this.tasksService.edit(task,taskId)
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.filteredTasks = this.tasks;
      }catch(err){
        console.log("Error al actualizar las tareas", err);
      }
    },
    async EditTask(){
      try{
        const task={
          title:this.NewTaskTitle,
          description:this.NewTaskDescription,
          due_date:this.NewTaskdueDate,
          status:0,
        }
        if(task.title===''){task.title=this.tasks.find(task=>task.id===this.editTaskId).title}
        if(task.description===''){task.description=this.tasks.find(task=>task.id===this.editTaskId).description}
        if(task.due_date===""){task.due_date=this.tasks.find(task=>task.id===this.editTaskId).due_date}

        await this.tasksService.edit(task,this.editTaskId)
        await this.getTasks()
        this.closePopUp()
        this.editTaskId=null
      }catch(err){
        console.log("Error al editar tarea",err);
      }
    },
    showPopUp(){
      this.visibleAddTask=true
    },
    closePopUp(){
      this.visibleAddTask=false
    },
    showEditTask(taskId){
      this.visibleEditTask=true
      this.editTaskId=taskId
    },
    closeEditTask(){
      this.visibleEditTask=false
    },
    async deleteTask(taskId){
      try{
        await this.tasksService.delete(taskId)
        await this.getTasks()
      }catch(err){
        console.log("Error al borrar tarea",err);
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
      <div v-if="visibleAddTask" class="dialog-popup">
        <div class="dialog-title">
          <h1>Create Task</h1>
        </div>
        <div class="input-title">
          <label for="title">Title</label>
          <pv-inputText v-model="NewTaskTitle" id="title" autocomplete="off"></pv-inputText>
        </div>
        <div class="input-description">
          <label for="description">Description</label>
          <pv-inputText v-model="NewTaskDescription" id="description" autocomplete="off"></pv-inputText>
        </div>
        <div class="input-date">
          <label for="date">Date</label>
          <pv-inputText v-model="NewTaskdueDate" id="date" autocomplete="off"></pv-inputText>
        </div>

        <div class="buttons-form">
          <pv-button class="cancel-button-form" id="button" label="cancel" @click="closePopUp()"></pv-button>
          <pv-button class="save-button-form" id="button" label="save" @click="AddTask()"></pv-button>
        </div>

      </div>

      <!-- Formulario de edicion de Task-->
        <div v-if="visibleEditTask"  class="dialog-popup">
          <div class="dialog-title">
            <h1>Create Task</h1>
          </div>
          <div class="input-title">
            <label for="title">Title</label>
            <pv-inputText v-model="NewTaskTitle" id="title" autocomplete="off"></pv-inputText>
          </div>
          <div class="input-description">
            <label for="description">Description</label>
            <pv-inputText v-model="NewTaskDescription" id="description" autocomplete="off"></pv-inputText>
          </div>
          <div class="input-date">
            <label for="date">Date</label>
            <pv-inputText v-model="NewTaskdueDate" id="date" autocomplete="off"></pv-inputText>
          </div>

          <div class="buttons-form">
            <pv-button class="cancel-button-form" id="button" label="cancel" @click="closeEditTask()"></pv-button>
            <pv-button class="save-button-form" id="button" label="save" @click="EditTask()"></pv-button>
          </div>

        </div>

      <div>
        <picture class="logoToDo">
          <h1>To Do</h1>
        </picture>
      </div>

      <div class="search-container">
        <pv-iconField>
          <pv-inputIcon class="pi pi-search" ></pv-inputIcon>
          <pv-inputText  v-model="value1" placeholder="Search" class="search"></pv-inputText>
        </pv-iconField>
      </div>
      <div class="addTask-container">
        <pv-button class="addTask" id="button" label="Add Task" @click="showPopUp()" ></pv-button>
      </div>
      <pv-scrollPanel style="width: 100%; height: 365px; overflow-y: auto;">
        <div class="Tasks" v-for="task in filteredTasks" :key="task.id" >
          <div class="tasks-text">
            <h3>{{task.title}}</h3>
            <span>{{task.description}}</span>
            <span>{{task.due_date}}</span>
          </div>
            <div class="tasks-buttons">
              <pv-button class="Edit" id="button" label="Edit Task" @click="showEditTask(task.id)" > </pv-button>
              <pv-button class="inProgress" id="button" label="In Progress" @click="updateTaskStatus(1,task.id)" > </pv-button>
              <pv-button class="done" id="button" label="Done" @click="updateTaskStatus(2,task.id)"></pv-button>
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
.tasks-buttons .Edit{
  grid-column:1/3;
}
.tasks-buttons .Edit:hover{
  background-color: #5eead4;
  transition-duration: 0.3s;
}
.tasks-buttons .inProgress{
  grid-column: 1 / 3;
  grid-row: 1;
}
#button{
  border-radius: 5px;

}
.inProgress:hover{
  background-color: #33FFE6;
  transition-duration: 0.3s;
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
.addTask-container{
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}
.addTask{
  width: 97%;
  padding: 3px;
  margin-bottom: 10px;
}
.addTask:hover{
  position: relative;
  top: 1px;
  transition: 0.3s;
}

.dialog-popup{
  display: flex;
  flex-direction: column;
  background-color: lightgray;
  border-radius: 5px;
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.dialog-popup .dialog-title h1{
  font-size: 25px;
  margin:10px;
}
.input-title{
  display: flex;
  flex-direction: column;
  margin:10px;
}
.input-description{
  display: flex;
  flex-direction: column;
  margin:10px;
}
.input-date{
  display: flex;
  flex-direction: column;
  margin:10px;
}
.buttons-form{
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  margin: 10px;
}
.cancel-button-form{
  padding: 5px;
}
.save-button-form{
  padding: 5px;
}
.cancel-button-form:hover{
  background-color: #FF0000;
  transition-duration: 0.3s;
}
.save-button-form:hover{
  background-color: #23FF30;
  transition-duration: 0.3s;
}
#title, #description, #date{
  border-radius: 5px;
  padding: 5px;
}
</style>