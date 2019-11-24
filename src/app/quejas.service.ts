import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queja } from './queja.model';
import { Router } from '@angular/router';
import { Score } from './score.model';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class QuejasService {
  private quejas: Queja[] = [];
  private quejasUpdated = new Subject<Queja[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getQuejas() {
    //creatorId = '5dcc86e89f0d08180f413288';
    console.log('http://10.0.1.70:3000/client/issue/');
    this.http
      .get<{ issues: any[]; }>(
        'http://10.0.1.70:3000/client/issue/'
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

  getQueja(id: string) {

    console.log('http://10.0.1.70:3000/client/issue/' + id);
    this.http
      .get<any[]>(
        'http://10.0.1.70:3000/client/issue/' + id
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

        this.quejas = transformedQuejas;
        //this.quejasUpdated.next([...this.quejas]);

        this.quejasUpdated.next(this.quejas);


      });
  }

  getQuejaUpdateListener() {
    return this.quejasUpdated.asObservable();
  }

  postScore( _id:null, score: number, placeEvent: string) {
    const newScore: Score = { _id, score, placeEvent };
    this.http
      .post<{ message: string, quejaId: string }>("http://10.0.1.70:3000/client/score", newScore)
      .subscribe(responseData => {
        // const id = responseData.taskId;
        // task.id = id;
        // this.tasks.push(task);
        // this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(["/"]);
      });
  }

  // deleteTask(taskId: string) {
  //   this.http.delete("http://localhost:3000/api/tasks/" + taskId)
  //     .subscribe(() => {
  //         const updatedTasks = this.tasks.filter(task => task.id !== taskId);
  //         this.tasks = updatedTasks;
  //         this.tasksUpdated.next([...this.tasks]);
  //     });
  // }
}
