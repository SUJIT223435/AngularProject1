import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {
  url="http://localhost:3000/posts";

  constructor(private http:HttpClient) { }

  postTask(data:any){
    return this.http.post<any>(this.url,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getTask(){
    return this.http.get<any>(this.url)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateTask(data:any,id:number){
    return this.http.put<any>(this.url+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteTask(id:number){
    return this.http.delete<any>(this.url+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
