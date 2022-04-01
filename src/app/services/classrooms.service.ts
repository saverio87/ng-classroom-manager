import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Classroom } from '../models/classroom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  getClassrooms(): Observable<Classroom[]> {
    let classrooms = this.webReqService.get('classrooms');
    console.log('load classrooms request called');
    
    return classrooms
  }


  // POST requests

  addClassroom(classroom: Classroom):Observable<any> {
    return this.webReqService.post('classrooms', classroom);
  }

  // PATCH requests

  addNote = (
    classroomId: string,
    payload: Object
  ): Observable<any> => {
    return this.webReqService.patch(`classrooms/${classroomId}/notes`, payload);   
  }

  addActivity = (
    classroomId: string,
    payload: Object
  ): Observable<any> => {
    return this.webReqService.patch(`classrooms/${classroomId}/activities`, payload);   
  }

  // DELETE requests

  deleteClassroom(classroomId: string): Observable<Classroom[]> {
    
    return this.webReqService.delete(`classrooms/${classroomId}`);
    
  }
  
  deleteNote(classroomId: string, itemId: string): Observable<any> {
    
    return this.webReqService.delete(`classrooms/${classroomId}/notes/${itemId}`);
    
  }

  deleteActivity(classroomId: string, itemId: string): Observable<any> {
    
    return this.webReqService.delete(`classrooms/${classroomId}/activities/${itemId}`);
    
  }


}
