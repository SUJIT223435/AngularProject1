import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskModel } from '../task.model';
import { TaskserviceService } from '../service/taskservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  taskForm: FormGroup;
  taskData: any;

  showAdd: boolean;
  showUpdate: boolean;
  TaskModelObj: TaskModel = new TaskModel();

  constructor(private formbuilder: FormBuilder, private service: TaskserviceService) { }

  // tasks=[
  //   {id:1,title:'angular project',description:'complet full task with html css javascript',Date:'22/6/2023'}
  // ]

  ngOnInit(): void {
    this.taskForm = this.formbuilder.group({
      title: [''],
      description: [''],
      date: [''],
    })
    this.getAllTask();
  }
  clickAddTask() {
    this.taskForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postTaskDetails() {
    this.TaskModelObj.title = this.taskForm.value.title;
    this.TaskModelObj.description = this.taskForm.value.description;
    this.TaskModelObj.date = this.taskForm.value.date;

    this.service.postTask(this.TaskModelObj).subscribe(res => {
      console.log(res);
      alert("Task Added Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.taskForm.reset();
    }, err => {
      alert("somthing went wrong")
    })
  }

  getAllTask() {
    this.service.getTask().subscribe(res => {
      this.taskData = res;
    })
  }

  deleteTask(data: any) {
    this.service.deleteTask(data.id).subscribe(res => {
      alert("Task Deleted");
      this.getAllTask();
    })
  }
  onEdit(data: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.TaskModelObj.id = data.id;
    this.taskForm.controls['title'].setValue(data.title);
    this.taskForm.controls['description'].setValue(data.description);
    this.taskForm.controls['date'].setValue(data.date);

  }
  updateTaskDetails() {
    this.TaskModelObj.title = this.taskForm.value.title;
    this.TaskModelObj.description = this.taskForm.value.description;
    this.TaskModelObj.date = this.taskForm.value.date;
    this.service.updateTask(this.TaskModelObj, this.TaskModelObj.id)
      .subscribe(res => {
        alert("updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.taskForm.reset();
        this.getAllTask();
      })
  }
}
