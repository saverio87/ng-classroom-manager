import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classroom } from '../models/classroom.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  
  readonly ROOT_URL;

  constructor(private http: HttpClient) {

    this.ROOT_URL = 'http://localhost:3000' 
  }

  get(uri: string) {
    let classrooms = this.http.get<any>(`${this.ROOT_URL}/${uri}`);
    return classrooms
  }

  post(uri: string, payload: Object) {
   
    return this.http.post<any>(`${this.ROOT_URL}/${uri}`, payload)
  }

  patch(uri: string, payload: Object) {
    return this.http.patch<any>(`${this.ROOT_URL}/${uri}`, payload)
  }

  delete(uri: string) {
    return this.http.delete<any>(`${this.ROOT_URL}/${uri}`)
  }

  // get(uri: string):Observable<Classroom[]> {
  //   let classrooms = this.http.get<Classroom[]>(`${this.ROOT_URL}/${uri}`);
  //   return classrooms
  // }

  
}