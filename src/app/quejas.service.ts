import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queja } from './queja.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class QuejasService {
  private quejas: Queja[] = [];
  private quejasUpdated = new Subject<Queja[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getQuejas(creatorId: string) {
    creatorId = '5dcc86e89f0d08180f413288';
    console.log('http://10.0.1.70:3000/client/issue/all/' + creatorId);
    this.http
      .get<{ issues: any[]; }>(
        'http://10.0.1.70:3000/client/issue/all/' + creatorId
      )
      .pipe(map((quejaData) => {
        console.log(quejaData);
        return quejaData;
        //        return quejaData.issues.map(quejaR => {

          /*
          return {
            _id: quejaR._id,
            uId: quejaR.uId,
            placeEvent: quejaR.placeEvent,
            description: quejaR.description,
            status: quejaR.status,
            userRate: quejaR.userRate,
            answers: quejaR.answers,
            finalComment: quejaR.finalComment,
            registerDate: quejaR.registerDate
          };
          */
        //});
      }))
      .subscribe(transformedQuejas => {
        console.log(transformedQuejas);

        this.quejas = transformedQuejas.issues;
        this.quejasUpdated.next([...this.quejas]);

      });
  }

  getQuejaUpdateListener() {
    return this.quejasUpdated.asObservable();
  }

  // addTask(project: string, title: string, introduction: string, instructions: string, times: string, location: string, date: string) {
  //   const task: Task = { id: null, project: project, title: title, introduction: introduction,
  //     instructions: instructions, times: times, location: location, date: date };
  //   this.http
  //     .post<{ message: string, taskId: string }>("http://localhost:3000/api/tasks", task)
  //     .subscribe(responseData => {
  //       const id = responseData.taskId;
  //       task.id = id;
  //       this.tasks.push(task);
  //       this.tasksUpdated.next([...this.tasks]);
  //       this.router.navigate(["/"]);
  //     });
  // }

  // deleteTask(taskId: string) {
  //   this.http.delete("http://localhost:3000/api/tasks/" + taskId)
  //     .subscribe(() => {
  //         const updatedTasks = this.tasks.filter(task => task.id !== taskId);
  //         this.tasks = updatedTasks;
  //         this.tasksUpdated.next([...this.tasks]);
  //     });
  // }
}
