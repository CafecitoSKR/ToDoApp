import http from "../../shared/services/http-common.js";

export class TasksApiService {
    getAll(){
        return http.get('http://localhost:3000/tasks');
    }
    edit(task,taskId){
        return http.put(`http://localhost:3000/tasks/${taskId}`,task)
    }
    create(task){
        return http.post(`http://localhost:3000/tasks`,task)
    }

    delete(taskId){
        return http.delete(`http://localhost:3000/tasks/${taskId}`);
    }
}