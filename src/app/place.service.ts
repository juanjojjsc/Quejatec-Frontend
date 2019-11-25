import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Queja } from './queja.model';
import { Router } from '@angular/router';
import { Place } from './place.model';

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private places: Place[] = [];
  private placesUpdated = new Subject<Place[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPlaces() {
    //creatorId = '5dcc86e89f0d08180f413288';
    console.log('http://34.69.131.58:8080/client/placeEvent/');
    this.http
      .get<{ placeEventGroups: any[]; }>(
        'http://34.69.131.58:8080/client/placeEvent/'
      )
      .pipe(map((placeData) => {
        console.log(placeData);
        return placeData;
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
      .subscribe(transformedPlaces => {
        console.log(transformedPlaces);
        this.places = transformedPlaces.placeEventGroups;
        console.log(this.places);
        this.placesUpdated.next([...this.places]);

      });
  }

  getPlaceUpdateListener() {
    return this.placesUpdated.asObservable();
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
