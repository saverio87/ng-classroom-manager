import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Classroom } from '../models/classroom.model';
import { Observable, of, forkJoin } from 'rxjs';
import { Student } from '../models/student.model';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(
    private webReqService: WebRequestService
  ) { }

  // GET requests

  getStudents(): Observable<Student[]> {
    let students = this.webReqService.get('students');
    console.log('load students request called');

    return students
  }

  getStudent(studentId:string): Observable<Student> {
    let student = this.webReqService.get(`students/${studentId}`);
    return student
  }

  // POST requests

  addStudent(student: Student): Observable<any> {
    return this.webReqService.post('students/add',
    student);
  }

  addStudents(students:Student[]): Observable<any> {
    return this.webReqService.post('students/add/many',students);
  }

  // PATCH requests

  updateContactDetails(
    studentId: string,
    itemId: string,
    payload: Object
    ): Observable<any> {
    
    return this.webReqService.patch(`students/${studentId}/contact-details/${itemId}`, payload); 
  }

  addAbsence = (
    studentId: string,
    payload: Object
  ): Observable<any> => {
    return this.webReqService.patch(`students/${studentId}/absences`, payload);   
  }

  addFeedback = (
    studentId: string,
    payload: Object
  ): Observable<any> => {
    return this.webReqService.patch(`students/${studentId}/feedback`, payload);   
  }

  // DELETE requests

  deleteStudent(studentId: string): Observable<Classroom[]> {
    return this.webReqService.delete(`students/${studentId}`);
  }
  
  deleteContactDetails(studentId: string, itemId: string): Observable<any> {
    
    return this.webReqService.delete(`students/${studentId}/contact-details/${itemId}`);
    
  }

  deleteAbsence(studentId: string, itemId: string): Observable<any> {
    
    return this.webReqService.delete(`students/${studentId}/absences/${itemId}`);
    
  }

  deleteFeedback(studentId: string, itemId: string): Observable<any> {
    
    return this.webReqService.delete(`students/${studentId}/feedback/${itemId}`);
    
  }

}
