import api from "../lib/axios";

export class TaskRepository {
    async getTasks(){
        const response = await api.get("tasks");
        return response.data["Tasks"];
    }
    async editTask(id:number){
        const response = await api.put(`tasks/${id}`,{
           
        });
        return response.data["message"]
    }
}